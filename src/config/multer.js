
import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";
import fs from "fs";

const uploadDirectory = path.resolve("uploads");

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory);
    },

    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname).toLowerCase();
        const uniqueName = `${randomUUID()}${extension}`;

        cb(null, uniqueName);
    }
});

const allowedMimeTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png"
];

const upload = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    },

    fileFilter: function (req, file, cb) {
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF, JPG and PNG files are allowed"));
        }
    }
});

export default upload;
