import fravega from "./../media/fravega.png";
import "./../styles/index.css"

export default function BusinessImage(){
    return (
        <div className="image-container">
          <img
            className="custom-image"
            src={fravega}
            alt="fravega"
          />
          <p className="image-text">Descripción</p>
        </div>
      );
    }