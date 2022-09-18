const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const port = 5000;
const path = require("path")
const router = require("./router/routes")

const url = require("url");


let app = express();

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })
    .then(() => {
        console.log("MongoDB is connected....");
    }).catch(error => {
        console.log(error);
    })


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/myvideos", express.static(path.join(__dirname, "myvideos")));
app.use("/", router)


app.get("/", (req, res) => {
    res.send("Server is started.")
})


app.listen(port, () => {
    console.log("Express server is started");
})