import React, { useState, useEffect } from "react";
import fravega from "./../media/fravega-1.png";
import garbarino from "./../media/garbarino-1.png";
import carrefour from "./../media/carrefour-logo.png";
import marketplace from "./../media/mkt.jpg";
import "./../styles/index.css";

export default function BusinessImage({ empresa, setNavBar }) {
  const [imagen, setImagen] = useState("");

  let imageStyle = {
    maxWidth: "80%",
    maxHeight: "400px",
    display: "block",
    margin: "0 auto",
  };

  console.log("empresa", empresa);

  // Use useEffect to update the image based on the empresa prop
  useEffect(() => {
    if (empresa === "Fravega") {
      setImagen(fravega);
      setNavBar("#a51f83")
    } else if (empresa === "Garbarino") {
      setImagen(garbarino);
      setNavBar("red")
    } else if (empresa === "Carrefour") {
      setImagen(carrefour);
      setNavBar("#0e3090")
    } else {
      setImagen(marketplace); // Clear the image if empresa is not "Fravega"
    }
  }, [empresa]);

  return (
    <div className="image-container">
      <img
        className="custom-image"
        style={imageStyle}
        src={imagen}
        alt=""
      />
    </div>
  );
}
