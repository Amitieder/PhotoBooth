import "./DisplayPhotos.css";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {loadModel, getModel} from '../../services/tfModel';

const DisplayPhotos = () => {

    const [imagesUrls, setImagesUrls] = useState<Array<string>>([]);

    useEffect(() => {
        getImages();
    }, []);

    async function getImages() {
        const response = await axios.get('images');
        await loadModel();
        const model = getModel();
        const imagesUrls = response.data.map((imageUrl: string) => {
            imageUrl = `data:image/jpg;base64, ${imageUrl}`
            return imageUrl;
        });
        setImagesUrls(Array.from(imagesUrls));
    }

    return (
        <div className="all-photos-wrapper">
            {imagesUrls.map((imageUrl) => 
                <div className="small-image-wrapper" key={imageUrl}>
                    <img src={imageUrl} className="small-image"/>
                </div>
            )}
        </div>
    )
}

export default DisplayPhotos;