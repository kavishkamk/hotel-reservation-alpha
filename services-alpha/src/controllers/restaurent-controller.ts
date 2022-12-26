import { CommonError, ErrorTypes } from "@alpha-lib/shared-lib";
import { NextFunction, Request, Response } from "express";
import { RestaurentCreatedPublisher } from "../events/publishers/restaurent-created-publisher";

import { RestaurentType } from "../models/RestaurentType";
import { natsWrapper } from "../nats-wrapper";

const getRestaurent = async (req: Request, res: Response, next: NextFunction) => {

    let restaurent;

    try {
        restaurent = await RestaurentType.find().populate("tags").exec();
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

    new RestaurentCreatedPublisher(natsWrapper.client).publish({
        id: restaurentSet.id,
        restaurentType: restaurentSet.restaurentType,
        numberOfTables: restaurentSet.numberOfTables,
        maxGuest: restaurentSet.maxGuest,
        version: restaurentSet.version
    });

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

const getRestaurentWithGivenTags = async (req: Request, res: Response, next: NextFunction) => {

    const { tags } = req.body;

    let restaurents;

    try {
        restaurents = await RestaurentType.find({ tags: { $all: tags } }).populate("tags").exec();
    } catch (err) {
        return next(err);
    };

    res.status(200).json({ restaurents });

};

const getRestaurentById = async (req: Request, res: Response, next: NextFunction) => {

    const restaurentId = req.params.restaurentId;

    let restaurent;

    try {
        restaurent = await RestaurentType.findById(restaurentId).populate("tags").exec();
    } catch (err) {
        return next(err);
    };

    if (!restaurent) {
        return next(new CommonError(404, ErrorTypes.NOT_FOUND, "Restaurent type not found"));
    };

    res.status(200).json({ restaurent });

};

export {
    createRestaurent,
    getRestaurent,
    deleteRestaurentType,
    getRestaurentWithGivenTags,
    getRestaurentById
};