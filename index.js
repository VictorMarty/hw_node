const express = require('express');
const multer = require('multer');

const app = express();
const {PORT} = require('./config')

app.use(express.static(__dirname));

const {router} = require('./routers')
app.use(multer({dest: "uploads"}).single("image"));

app.use('/', router);

app.listen(PORT, () => console.log('starting server'));
