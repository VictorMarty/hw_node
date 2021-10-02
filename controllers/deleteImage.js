const db = require("../entities/Database");

module.exports = async (req, res) => {
    const id = req.params.id
    if (db.downloaded_image[id]) {
        db.remove(id)
        return res.send({'id': id})
    } else {
        res.statusCode = 400
        return res.send('this is invalid id')
    }
}