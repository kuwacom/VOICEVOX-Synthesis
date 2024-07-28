export const sleep = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));

export const randRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export const fetchWithTimeout = (timeout: number, url: string, options: RequestInit | undefined): Promise<Response> => {
    return Promise.race([
        fetch(url, options),
        new Promise<Response>((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))
    ]);
};