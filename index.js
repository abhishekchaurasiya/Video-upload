const express = require("express")
const fs = require("fs")

const app = express();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/video", (req, res) => {
    // // range return string
    // const range = req.headers.range;

    // if (!range) {
    //     res.status(400).send("Here is must Range headers..")
    // }
    // // start hrere streaming
    // const videoPath = "./video.mp4"
    // const videoSize = fs.statSync(videoPath).size;

    // // data jab stream hota hai to complete data send nahi hota hai but wah chunk by chunk data stream hota hai 
    // // define chunk size data 
    // const ChunkSize = 10 ** 6; // means 1 mb
    // const start = Number(range.replace(/\D/g, ""))
    // const end = Math.min(start + ChunkSize, videoSize - 1)
    // const contentLength = end - start + 1;

    // const headers = {
    //     "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    //     "Accept-Ranges": "bytes",
    //     "Content-Length": contentLength,
    //     "Content-Type": "video/m4"
    // }
    // //  206 means partials data means abhi data aa rha hai 
    // res.writeHead(206, headers)
    // const videoStream = fs.createReadStream(videoPath, { start, end })

    // // pipe() method yah readble streams se writable stream me write karta hai 
    // videoStream.pipe(res)



    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    const videoPath = "./video.mp4";
    const videoSize = fs.statSync(videoPath).size;
    // console.log("size of video is:", videoSize);
    const CHUNK_SIZE = 10 ** 6; //1 MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": 'bytes',
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);

})






app.listen(4000, () => {
    console.log("Server is started....");
})