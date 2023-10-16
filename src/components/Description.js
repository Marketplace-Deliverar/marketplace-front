import { styled } from "@mui/material/styles";
import React from 'react';

function Description({ text }) {
  // Divide el texto en párrafos utilizando saltos de línea
  const paragraphs = text.split('\n');

  return (
    <div>
      {paragraphs.map((paragraph, index) => (
        <p style={{ textAlign: 'justify', color:"#FFFFFF" }} key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

export default Description;

