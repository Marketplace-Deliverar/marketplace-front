import React from "react";

// Styles & icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import logo from "../media/logo.svg";

// External component library
import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Typography,
  styled,
} from "@mui/material";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  marginTop: theme.spacing(4),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: theme.palette.primary.contrastText,
}));

const StyledLogo = styled("img")(({ theme }) => ({
  width: "100px",
  height: "auto",
}));

const StyledSmallText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginTop: theme.spacing(1),
}));

const Footer = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Grid
          container
          spacing={2}
          columns={12}
          align="center"
          alignItems={"baseline"}
        >
          <Grid item xs={4}>
            <StyledLogo src={logo} alt="Logo" />
            <StyledSmallText variant="body2">Lago Escobar</StyledSmallText>
          </Grid>
          <Grid item xs={4} displ>
            {/* Derechos de autor */}
            <Typography variant="body2" align="center">
              © {new Date().getFullYear()} Deliver.ar - Todos los derechos
              reservados
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <StyledIconButton>
              <FacebookIcon />
            </StyledIconButton>
            <StyledIconButton>
              <TwitterIcon />
            </StyledIconButton>
            <StyledIconButton>
              <InstagramIcon />
            </StyledIconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Footer;
