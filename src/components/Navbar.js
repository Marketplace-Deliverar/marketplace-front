import React, { useState } from "react";

// Styles, icons & context
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

// Components
import { AppBar, Container, Toolbar } from "@mui/material";
import { useMediaQuery } from "@mui/material";

const Navbar = () => {
  const isTinyDisplay = useMediaQuery((theme) => theme.breakpoints.down("md"));

  // Handlers

  // Renders
  const renderSmallDisplay = () => {
    return <></>;
  };

  const renderMediumDisplay = () => {
    return <></>;
  };

  return (
    <AppBar className="navbar" position="static" sx={{ mb: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* TODO: See if logo goes here or not
          <StyledIcon src="/logo.svg" alt="ag-skin=studio logo" />
          */}

          {isTinyDisplay ? renderSmallDisplay() : renderMediumDisplay()}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
