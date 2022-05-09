import "./App.css";
import Header from "./components/header/Header";
import UploadPhoto from "./components/upload-photo/uploadPhoto";
import DisplayPhotos from "./components/all-photos/DisplayPhotos";

function App() {
  return (
    <div className="App">
      <div className="header-wrapper">
        <Header></Header>
      </div>
      <div className="content-section">
        <div className="upload-photo-section">
          <UploadPhoto></UploadPhoto>
        </div>
        <div className="all-photos-section">
            <DisplayPhotos></DisplayPhotos>
        </div>
      </div>
    </div>
  );  
}

export default App;
