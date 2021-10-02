
// TODO: Понять различия import и require
const {EventEmitter} = require("events");
const {existsSync} = require("fs");
const Jpg = require("./Jpg")

const fs = require('fs')

// TODO: Перенести в config
const path = require('path');
const util = require("util");


const dbFolder = path.resolve(__dirname, './uploads');

const dbDumpFile = path.resolve(dbFolder, 'dump.json');

class Database extends EventEmitter {
    constructor() {
        super();
        this.downloaded_image = {}
    }
    initFromDump() {
        if (existsSync(dbDumpFile) === false) {
            return;
        }
        const dump = require(dbDumpFile);

        if (typeof dump === 'object') {
            this.downloaded_image = {};

            for (let id in dump) {

                const jpg = dump[id];

                this.downloaded_image[id] = new Jpg(jpg.id, jpg.size, jpg.createdAt);
            }
        }
    }
        insert(id,size,createdAt) {
        // TODO: Добавить проверку на наличие этого изображения в бд
            const jpg = new Jpg(id, size, createdAt)
            this.downloaded_image[id] = jpg.toJSON()
            this.emit('changed');
        }


    remove(id) {
        delete this.downloaded_image[id];
        fs.unlink(path.resolve(__dirname, `./uploads/${id}.jpg`),(err)=> { if(err) {console.log(`unlink callback ${err}`)}})

        this.emit('changed');
    }



    toList() {
        const list = []
        for (let id in this.downloaded_image) {
            list.push(this.downloaded_image[id])
        }
        return list
    }

    toJSON() {
        return JSON.stringify(this.downloaded_image, null, '\t')
    }
}

const db = new Database();


db.initFromDump();

const prettifyJsonToString = (json) => {JSON.stringify(json, null, '\t')}


// TODO: В 16 ноде излишество, надо переделать
const writeFile = async (path_to ,content) => {
    const wfa = util.promisify(fs.writeFile)
    await wfa(path_to,content,{ encoding: 'utf-8' });
}

db.on('changed', () => {
    // FIXME: Возможно не надо преврщать в джисон

    fs.writeFile(dbDumpFile,db.toJSON().toString(), () => console.log("emit done"))
    // writeFile(dbDumpFile, prettifyJsonToString(db), function (err) {
    //     if (err) {
    //         return console.log(err);
    //     }
    // })
});

module.exports = db;