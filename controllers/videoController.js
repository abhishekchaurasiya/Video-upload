const videoModel = require("../models/videoModel")

// Got it, can you make a POST request, hit it from postman, print out query parameters from URL and send the video of its working

const createVideo = async (req, res) => {
    try {
        const { name } = req.body;
        let videosPaths = [];

        let getfiles = req.files.videos
        if (Array.isArray(getfiles) && getfiles.length > 0) {
            for (let item of getfiles) {
                videosPaths.push("/" + item.path)
            }
        }
        const createVideos = await videoModel.create({ name, videos: videosPaths });
        res.status(201).json({ message: "Video created succuefully", createVideos })

    } catch (error) {
        res.status(500).json(error)
    }
}

const getVideos = async (req, res) => {
    try {
        const media = await videoModel.find();

        res.status(200).json(media);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { createVideo, getVideos }