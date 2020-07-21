import { Request, Response } from "express";
import getMetraTrain from "../util/getMetraTrain";

export let metraTrain = (req: Request, res: Response): void => {
    getMetraTrain().then((result): void => {
        res.send(result);
    }).catch((err): Response => res.send(err));
};