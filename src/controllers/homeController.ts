import { Request, Response } from "express";

export let index = (req: Request, res: Response): void => {
    res.render("home", {
        title: "Home"
    });
};

export let config = (req: Request, res: Response): void => {
    res.render("config", {
        title: "config"
    });
};