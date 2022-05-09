import "./uploadPhoto.css";
import { MdFileUpload } from 'react-icons/all';
import React, {useState} from "react";
import axios from "axios";

const UploadPhoto = () => {

    const [image, setImage] = useState<string | File>();
    const [showImage, setShowImage] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [name, setName] = useState('');

    async function imageChange(event: any){
        if (event.target.files && event.target.files.length > 0) {
          const file = event.target.files[0]
    
          setImage(file);
          setShowImage(true);
          setImageUrl(URL.createObjectURL(file));
        }
      }
    
      async function saveImage() {
        const formData = new FormData();
        formData.append("image", image as File, (image as File).name)
    
        const response = await axios.post('images', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
    
        setName('');
      }

      function setInputName(event: any) {
        setName(event.target.value);
      }

      function uploadFiles() {
        document.getElementById('browse-input')?.click();
      }

    return (
        <div className="upload-photo-wrapper">
            <div className="image-wrapper">
                {showImage && 
                <div>
                    <img src={imageUrl} id="img"></img>
                </div>}
                {!showImage && 
                <label className="image-upload-wrapper">
                    <input className="upload-input" id="browse-input" accept="image/*" type="file" onChange={imageChange}/>
                    <MdFileUpload />UPLOAD A PHOTO
                </label>}
            </div>
            <input className="name-input" type="text" placeholder="Name" onChange={setInputName}/>
            <button className="button" onClick={uploadFiles}>BROWSE</button>
            <button className="button" disabled={(imageUrl === '') || (name === '')} onClick={saveImage}>SAVE</button>
          </div>
    )
}

export default UploadPhoto;