import express from 'express';
import cors from 'cors';

import synthesize from './routes/synthesize';
import logger from './utils/logger';
import Config from './config/config';
import speakers from './routes/speakers';
import CacheManager from './utils/cacheManager';

// エラーハンドリング
if (Config.errorHandle) {
    process.on("uncaughtException", (err) => {
        logger.error(err.toString());
    });
}

CacheManager.init();

const app = express();
app.use(cors({ origin: Config.server.origin })); // cors 設定
app.listen(Config.server.port, Config.server.host, () => {
    logger.info(`Server is running on: http://${Config.server.host}:${Config.server.port}`);
});

// API Server
const mainRouter = express.Router();
app.use('/v1', mainRouter);
app.use((req, res, next) => {
    res.status(404).end();
});
mainRouter.get('/speakers', speakers);
mainRouter.get('/synthesize', synthesize);