import { NextFunction, Request, Response } from "express";
import { CommonError, ErrorTypes } from "@alpha-lib/shared-lib";

import { RestaurentTag } from "../models/RestaurentTags";

const getRestaurentTags = async (req: Request, res: Response) => {

    const tags = await RestaurentTag.find().exec();

    res.status(200).json({ tags });

};

const createRestaurentTag = async (req: Request, res: Response, next: NextFunction) => {

    const { tagName } = req.body;

    const tag = RestaurentTag.build({
        tagName
    });

    try {
        await tag.save();
    } catch (err) {
        return next(err)
    }
    res.status(201).json({ tag: tag });

};

const updateRestaurentTag = async (req: Request, res: Response, next: NextFunction) => {

    const { id, tagName } = req.body;

    // find tag
    const tag = await RestaurentTag.findById(id).exec();

    if (!tag) {
        return next(new CommonError(404, ErrorTypes.NOT_FOUND, "tag not found"));
    };

    // set new data
    tag.set({
        tagName
    });

    // update version
    tag.increment();

    try {
        await tag.save();
    } catch (err) {
        return next(err);
    }

    res.status(200).json({ tag });

};

// only for development
const deleteRestaurentTag = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    // delete tag
    const result = await RestaurentTag.deleteOne({ _id: id });

    res.status(200).json({ deleteCount: result });

};

export {
    createRestaurentTag,
    getRestaurentTags,
    updateRestaurentTag,
    deleteRestaurentTag
};