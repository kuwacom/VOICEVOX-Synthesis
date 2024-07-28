import express, { Request, Response } from 'express';
import { getSpeakers } from '../api/getSpeakers';

export default async function speakers(req: Request, res: Response) {
    const speakers = await getSpeakers();
    if (!speakers) {
        res.status(500);
        return;
    }
    res.status(200).json(speakers);
    return;
}