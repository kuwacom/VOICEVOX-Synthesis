import express, { Request, Response } from 'express';
import { getSpeakers } from '../api/getSpeakers';
import logger from '@/utils/logger';

export default async function speakers(req: Request, res: Response) {
    logger.debug(`Request | method:GET | ${req.url}`);
    
    const speakers = await getSpeakers();
    if (!speakers) {
        res.status(500);
        logger.error(`Response | status:500 | ${req.url}`);
        return;
    }
    res.status(200).json(speakers);
    logger.debug(`Response | status:200 | ${req.url}`);
    return;
}