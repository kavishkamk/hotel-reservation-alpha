import { NextFunction, Request, Response } from "express";
import { CommonError, ErrorTypes } from "@alpha-lib/shared-lib";

import { Tag } from "../models/RoomTypeTag";

const getTags = async (req: Request, res: Response) => {

    const tags = await Tag.find().exec();

    res.status(200).json({ tags });

};

const createTag = async (req: Request, res: Response, next: NextFunction) => {

    const { tagName } = req.body;

    const tag = Tag.build({
        tagName
    });

    try {
        await tag.save();
    } catch (err) {
        return next(err)
    }
    res.status(201).json({ tag: tag });

};

const updateTag = async (req: Request, res: Response, next: NextFunction) => {

    const { id, tagName } = req.body;

    // find tag
    const tag = await Tag.findById(id).exec();

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
const deleteTag = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    // delete tag
    const result = await Tag.deleteOne({ _id: id });

    res.status(200).json({ deleteCount: result });

};

export {
    createTag,
    updateTag,
    getTags,
    deleteTag
};