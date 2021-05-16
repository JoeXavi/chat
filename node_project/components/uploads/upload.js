const util = require("util");
var path = require('path');
const multer = require("multer");
const { config } = require("../../config")
const maxSize = parseInt(config.fileSize) * 1024 * 1024;

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.fileUrl);
    },
    filename: (req, file, cb) => {
        let nameFile = "file"+ '_' + Date.now() + path.parse(file.originalname).ext;

        cb(null, nameFile);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");

let PromiseUpload = util.promisify(uploadFile);

module.exports= PromiseUpload

//module.exports = uploadFile