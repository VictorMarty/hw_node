const path = require('path');
const dbFolder = path.resolve(__dirname, './uploads');
const dbDumpFile = path.resolve(dbFolder, 'dump.json');
module.exports = {
    PORT: 8080,
    dbFolder,
    dbDumpFile
};