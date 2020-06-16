import { Request, Response } from "express";
import getEvents from "../util/getCtaBus";

export let events = (req: Request, res: Response): void => {
    getEvents(req.params.calendar).then((result): void => {
        res.send(result);
    }).catch((err): Response => res.send(err));
};