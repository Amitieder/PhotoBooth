const express         = require('express');
const multer          = require('multer');
const imagesControler = require('./imagesController');

const upload = multer();

const imagesRouter = express.Router();

imagesRouter.get('/', imagesControler.getImages);

imagesRouter.post('/', upload.single('image'), imagesControler.saveImage);

module.exports = imagesRouter;