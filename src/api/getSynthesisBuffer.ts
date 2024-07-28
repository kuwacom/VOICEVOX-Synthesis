import Config from "@/config/config";
import { AudioQuery } from "@/types/synthesis";
import logger from "@/utils/logger";

export default async function getSynthesisBuffer(
    audioQuery: AudioQuery , type: number,
) {
    try {
        const query = new URLSearchParams({
            speaker: type.toString()
        });
        const res = await fetch(
            Config.VOICEVOXUrl + `/synthesis?${query}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(audioQuery),
            }
        );
        if (!res.ok) return null;
        const data: ArrayBuffer = await res.arrayBuffer();
        return Buffer.from(data);
    } catch (error) {
        logger.error(error);
        return null;
    }
}