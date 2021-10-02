const express = require('express')
const multer = require('multer')

const path = require('path')
const app = express();

const db = require('./Database')

const fs = require('fs')

const backrem = require('backrem')

app.use(express.static(__dirname));
multer.diskStorage({})
app.use(multer({dest:"uploads"}).single("image"));
app.post("/upload", function (req, res, next) {
    let filedata = req.file;
    console.log(filedata)
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send(filedata.filename);
    db.insert(filedata.filename, filedata.size, new Date())
    fs.rename(path.resolve(__dirname, filedata.path),`${path.resolve(__dirname, filedata.path)}.jpg`, (err) => console.log(err))
});

app.get('/list', (req, res) => {
    console.log(db.toList())
    res.send(db.toList());
})
app.get('/image/:id', (req,res) => {
    const id = req.params.id
    const filePath =  path.resolve(__dirname, './uploads', `${id}.jpg`);
    res.sendFile(filePath);
})

app.delete('/image/:id', (req,res) => {
    const id = req.params.id
    if(db.downloaded_image[id]) {
        db.remove(id)
        res.send({id})
    } else {
        res.statusCode = 400
        res.send('this is invalid id')
    }
})

app.get('/merge', (req, res) => {

     let {front, back, color, threshold} = req.query;
     color = color.split(",")

    const streamFront = fs.createReadStream(path.resolve(__dirname, `./uploads/${front}.jpg`))
    const streamBack = fs.createReadStream(path.resolve(__dirname, `./uploads/${back}.jpg`))
        console.log(color)
    backrem.replaceBackground(streamFront,streamBack,color,threshold).then(
        (readableStream) => {
            readableStream.pipe(res)
        }
    )
})



app.listen(8080, () => console.log('starting server'))
