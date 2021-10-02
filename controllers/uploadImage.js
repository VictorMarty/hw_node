const db = require('../entities/Database');
const fs = require("fs");
const path = require("path");
const {dbFolder} = require('./../config')
module.exports = async (req, res) => {
    const filedata = req.file;
    if (!filedata) {
        throw new Error('image content should not be empty')
    }
    await db.insert(filedata.filename, filedata.size, new Date());
    fs.rename(
        path.resolve(dbFolder, filedata.filename),
        `${path.resolve(dbFolder, filedata.filename)}.jpg`,
        (err) => {if (err) {console.log(err)}}
    )
    return res.json({'id': filedata.filename})
}