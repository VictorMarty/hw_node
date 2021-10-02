const db = require('../entities/Database');
module.exports = (req, res) => {res.send(db.toList());}