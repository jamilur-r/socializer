import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from "uuid";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", "media"));
    },
    filename: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        cb(
            null,
            uuidv4() +
            ext
        );
    },
})

export const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
            return callback(new Error("Only images are allowed"));
        }
        callback(null, true);
    },
})