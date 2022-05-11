const fs           = require('fs');
const path         = require('path');
const ImagesModel  = require('./imagesModel');

const getImages = async (req: any, res: any) => {

    const path = './images';
    let savedImages: Array<string> = [];            

    const mainProm = new Promise(async(resolve: any, reject: any) => {
        fs.readdir(path, async (err: any, files: any) => {
            if(err){
                reject();
            }
           
            let promiseArray: Array<any> = [];

            files.forEach((file: any) => {
                const readFileProm = new Promise(async(res: any, rej: any) => {
                    fs.readFile(`${path}/${file}`, function(err: any, data: any) {
                        if (err){
                            rej();
                        } 
                        
                        savedImages.push(new Buffer(data).toString('base64'));
                        res();
                    });
                });

                promiseArray.push(readFileProm);
            });

            await Promise.all(promiseArray);
            resolve();
        });
    });

    await mainProm;
    res.send(savedImages);
};

const saveImage = async (req: any, res: any) => {

    const file = req.file;
    const path = './images';

    if (!fs.existsSync(path)){
        fs.mkdirSync(path);
    }

    const fullPath = `${path}/${file.originalname}`;

    fs.writeFile(fullPath, file.buffer, (err: any) => {

        if(err)
            console.error(err);
        else {
            const image = new ImagesModel({
                url: fullPath
            });

            image.save()
            .then((result: any) => res.send('ok'))
            .catch((err: any) => console.log(err));
        }
    });
};

module.exports = {
    getImages,
    saveImage
}