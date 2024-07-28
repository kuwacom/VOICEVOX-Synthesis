import { VoiceCache } from "@/types/cache";
import { sleep } from "./utils";
import Config from "@/config/config";
import logger from "./logger";

namespace CacheManager {
    export const MemoryVoiceCache: { [ type: number ]: VoiceCache } = {}

    export async function init() {
        (async()=>{
            while (true) { // cache ttl task
                await sleep(Config.cache.ttl);
                for (const type in MemoryVoiceCache) delete MemoryVoiceCache[type];
            }
        })();
        (async()=>{
            while (true) { // cache ttl task
                await sleep(10000);
                let count = 0;
                Object.keys(MemoryVoiceCache).forEach((type) => {
                    count += Object.keys(MemoryVoiceCache[Number(type)]).length;
                });
                logger.debug('Cache Length: ' + count);
                if (count > Config.cache.maxLength) {
                    for (const type in MemoryVoiceCache) {
                        if (count - Object.keys(MemoryVoiceCache[type]).length < Config.cache.maxLength) {
                            delete MemoryVoiceCache[type];
                            break;
                        }
                        delete MemoryVoiceCache[type];
                    }
                }
            }
        })();
    }

    export function searchVoiceCache(type: number, text: string) {
        if (!(type in MemoryVoiceCache)) return null;
        if (!(text in MemoryVoiceCache[type])) return null;
        return MemoryVoiceCache[type][text];
    }

    export function setVoiceCache(type: number, text: string, voice: Buffer) {
        if (!MemoryVoiceCache[type]) MemoryVoiceCache[type] = {};
        MemoryVoiceCache[type][text] = voice;
    }
}

export default CacheManager;