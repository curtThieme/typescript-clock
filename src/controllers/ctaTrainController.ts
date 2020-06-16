import { Request, Response } from "express";
import getCtaTrain from "../util/getCtaTrain";

export let ctaTrain = (req: Request, res: Response): void => {
    getCtaTrain(req.params.train).then((result): void => {
        res.send(result);
    }).catch((err): Response => res.send(err));
};