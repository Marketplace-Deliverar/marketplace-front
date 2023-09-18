import styled from "@emotion/styled";
import { AppBar } from "@mui/material";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  top: "100vh",
  bottom: 0,
  maxHeight: "4rem",
}));

const Footer = () => {
  return (
    <StyledAppBar position="sticky" component="footer">
      {/* TODO */}
    </StyledAppBar>
  );
};

export default Footer;
