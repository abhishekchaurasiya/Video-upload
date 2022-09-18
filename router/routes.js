const express = require("express")
const videoController = require("../controllers/videoController")
const multer = require("multer")
const fs = require("fs")
const path = require("path")

const router = express.Router();
const { createVideo, getVideos } = require("../controllers/videoController")


// Setup of multer mean where is shows this file 
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync("myvideos")) {
            fs.mkdirSync("myvideos");
        }

        if (!fs.existsSync("myvideos/videos")) {
            fs.mkdirSync("myvideos/videos");
        }
        cb(null, "myvideos/videos");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
})

let upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        var extention = path.extname(file.originalname);

        if (extention !== ".mp4") {
            return cb(new Error("Only videos are allowed!"));
        }
        cb(null, true);
    },
})

// Create new video api
router.post("/createvideo", upload.fields([
    {
        name: "videos",
        maxCount: 5,
    },
]), createVideo);


// Get all vidoe api
router.get("/getallvideo", getVideos)



module.exports = router;