const { Router } = require('express');
const controllers = require('./controllers');

const router = new Router();

router.post("/upload", controllers.uploadImage);
router.get('/list', controllers.getListImages);
router.get('/image/:id', controllers.downloadImage);
router.delete('/image/:id', controllers.deleteImage);
router.get('/merge', controllers.mergeImages);

exports.router = router