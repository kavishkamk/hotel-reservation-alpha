import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { v1 as uuidv1 } from 'uuid';

const fileUpload = multer({
    limits: {
        fileSize: 500000
    },
    storage: multer.diskStorage({
        destination: (req: Request, file: Express.Multer.File, cb) => {
            cb(null, "upload/images");
        },
        filename: (req: Request, file: Express.Multer.File, cb): void => {
            let ext: string;
            if (file.mimetype === 'image/png') {
                ext = "png";
            } else if (file.mimetype === "image/jpg") {
                ext = "jpg";
            } else {
                ext = "jpeg"
            };
            cb(null, uuidv1() + "." + ext);
        }
    }),
    fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
});

export { fileUpload };