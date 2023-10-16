import React from 'react';

const Tittle = ({ text, color, align, padding}) => {
  const style = {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: align, // Ajusta el valor de textAlign directamente a la prop
    color: color, // Ajusta el valor de color directamente a la prop
    paddingTop: padding,
  };

  return (
    <h1 style={style}>{text}</h1>
  );
};

export default Tittle;
