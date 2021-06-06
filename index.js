const express = require("express");
const sharp = require("sharp");
const https = require("https");
const fs = require("fs");

const app = express();
const port = 8080;

app.get("/process", (req, res) => {
    const file = fs.createWriteStream("file.jpg");

    const pipeline = sharp();
    pipeline.clone().resize(800, 600).pipe(file);

    const request = https.get(req.query.url, function (response) {
        response.pipe(pipeline);
    });

    res.send("i am done");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
setInterval(() => {
    console.clear();
    const used = process.memoryUsage();
    for (let key in used) {
        console.log(`${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`);
    }
}, 250);
