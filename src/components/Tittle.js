import React from 'react';

const Title = ({ text, color, align }) => {
  const style = {
    color: color,
    textAlign: align,
  };

  return (
    <h1 style={style}>{text}</h1>
  );
};

export default Title;
