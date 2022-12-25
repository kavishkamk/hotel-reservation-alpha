import { NextFunction, Request, Response } from "express";
import { RoomTypeCreatedPublisher } from "../events/publishers/room-type-created-publisher";
import { RoomType } from "../models/RoomType";
import { natsWrapper } from "../nats-wrapper";

const getRooms = async (req: Request, res: Response, next: NextFunction) => {

    let rooms;

    try {
        rooms = await RoomType.find().populate("tags").exec();
    } catch (err) {
        return next(err);
    };

    res.status(200).json({ rooms });

};

const createRoom = async (req: Request, res: Response, next: NextFunction) => {

    const { roomType, numberOfRooms, description, imageURL, price, stars, amenities, tags, maxGuest } = req.body;

    const roomSet = RoomType.build({
        roomType,
        numberOfRooms,
        description,
        imageURL,
        price,
        stars,
        amenities,
        tags,
        maxGuest
    });

    try {
        await roomSet.save();
    } catch (err) {
        return next(err);
    };

    await new RoomTypeCreatedPublisher(natsWrapper.client).publish({
        id: roomSet.id,
        roomType: roomSet.roomType,
        numberOfRooms: roomSet.numberOfRooms,
        price: roomSet.price,
        maxGuest: roomSet.maxGuest,
        version: roomType.version
    });

    res.status(201).json({ roomType: roomSet });

};

const deleteRoomType = async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.roomTypeId;

    let result;

    try {
        result = await RoomType.deleteOne({ id });
    } catch (err) {
        return next(err);
    };

    res.status(200).json({ result });

};

export {
    createRoom,
    getRooms,
    deleteRoomType
};