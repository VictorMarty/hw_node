const path = require("path");

const {dbFolder} = require('./../config')
module.exports = async (req, res) => {
    res.header("Content-Type", 'image/jpeg');
    const id = req.params.id
    console.log(path.resolve(dbFolder, `${id}.jpg`))
    const filePath = path.resolve(dbFolder, `${id}.jpg`);
    return res.sendFile(filePath);
}