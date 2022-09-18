const mongoose = require("mongoose")

const videoSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    videos: [{ type: String }]

}, { timestamps: true })

module.exports = mongoose.model("Video", videoSchema)