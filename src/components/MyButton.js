import React, {useState} from 'react';

// Styles, icons & context
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

// Components
import Button from '@mui/material';

const MyButton = ({label, disabled}) => {
  return (
    <Button variant="contained" color="primary" disabled={disabled}>
        {label}
    </Button>
  );
};

export default MyButton;

