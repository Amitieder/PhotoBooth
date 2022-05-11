import express from "express";
import cors from "cors";

const app = express();
const port = 3000;
const mongoose = require('mongoose');
const imagesRoute = require('./images/imagesRoute');
const multer = require('multer');

app.use(cors());
app.use(express.static(`/client/images`));
app.use('/images', imagesRoute);

mongoose.connect("mongodb://localhost:27017/photo-booth", { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result: any) => app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  }))
  .catch((err: any) => console.log(err));