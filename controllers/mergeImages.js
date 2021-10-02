const fs = require("fs");
const path = require("path");
const backrem = require("backrem");
const {dbFolder} = require('./../config')
module.exports = async (req,res) => {
    let {front, back, color, threshold} = req.query;
    color = color.split(",")
    res.header("Content-Type",'image/jpeg');
    const streamFront = fs.createReadStream(path.resolve(dbFolder, `./${front}.jpg`))
    const streamBack = fs.createReadStream(path.resolve(dbFolder, `./${back}.jpg`))
    backrem.replaceBackground(streamFront,streamBack,color,threshold).then(
        (readableStream) => {
            return readableStream.pipe(res)
        }
    )

}