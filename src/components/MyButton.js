import React, { useState } from 'react';

// Styles, icons & context
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

// Components
import Button from '@mui/material/Button';

const MyButton = ({ label, color, disabled }) => {

  const labelStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '16px',
    textTransform: 'capitalize'
  }

  return (
    <Button style={labelStyle} variant="contained" color={color} disabled={disabled}>
      {label}
    </Button>
  );
};

export default MyButton;

