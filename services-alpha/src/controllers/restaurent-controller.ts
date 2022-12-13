import { NextFunction, Request, Response } from "express";

import { RestaurentType } from "../models/RestaurentType";

const getRestaurent = async (req: Request, res: Response, next: NextFunction) => {

    let restaurent;

    try {
        restaurent = await RestaurentType.find().populate("tags.restaurenttags").exec();
    } catch (err) {
        return next(err);
    };

    res.status(200).json({ restaurent });

};

const createRestaurent = async (req: Request, res: Response, next: NextFunction) => {

    const { restaurentType, numberOfTables, description, imageURL, stars, tags, maxGuest } = req.body;

    const restaurentSet = RestaurentType.build({
        restaurentType,
        numberOfTables,
        description,
        imageURL,
        stars,
        tags,
        maxGuest
    });

    try {
        await restaurentSet.save();
    } catch (err) {
        return next(err);
    };

    res.status(201).json({ roomType: restaurentSet });

};


const deleteRestaurentType = async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.restaurentTypeId;

    let result;

    try {
        result = await RestaurentType.deleteOne({ id });
    } catch (err) {
        return next(err);
    };

    res.status(200).json({ result });

};

export {
    createRestaurent,
    getRestaurent,
    deleteRestaurentType
};