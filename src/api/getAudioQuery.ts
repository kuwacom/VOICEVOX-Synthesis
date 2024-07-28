import Config from "@/config/config";
import { AudioQuery } from "@/types/synthesis";
import logger from "@/utils/logger";

export default async function getAudioQuery(
    text: string, type: number,
) {
    try {
        const query = new URLSearchParams({
            text: text,
            speaker: type.toString()
        });
        const res = await fetch(
            Config.VOICEVOXUrl + `/audio_query?${query}`,
            {
                method: 'POST'
            }
        );
        if (!res.ok) return null;

        const data = await res.json() as AudioQuery;
        return data;
    } catch (error) {
        logger.error(error);
        return null;
    }
}