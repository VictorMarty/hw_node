const {EventEmitter} = require("events");
const fs = require('fs');
const path = require('path')
const {dbDumpFile, dbFolder} = require('../config');
const Jpg = require("./Jpg");

class Database extends EventEmitter {
    constructor() {
        super();
        this.downloaded_image = {};
    }

    initFromDump() {
        if (fs.existsSync(dbDumpFile) === false) {
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

    async insert(id, size, createdAt) {
        // if (fs.existsSync(path.resolve(dbFolder, `${id}.jpg`)) === false) {
        //     throw new Error('DataBase problem, cant insert')
        // }
        const jpg = new Jpg(id, size, createdAt)
        this.downloaded_image[id] = jpg.toJSON()
        this.emit('changed');
    }

    remove(id) {
        // if (fs.existsSync(path.resolve(dbFolder, `${id}.jpg`)) === false) {
        //     throw new Error('DataBase problem, cant remove')
        // }
        delete this.downloaded_image[id];
        fs.unlink(path.resolve(dbFolder, `${id}.jpg`), (err) => {
            if (err) {
                console.log(`unlink callback ${err}`)
            }
        })
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

db.on('changed', () => {
    fs.writeFile(dbDumpFile, db.toJSON().toString(), () => console.log("emit done"))
});

module.exports = db;