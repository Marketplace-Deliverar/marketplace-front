import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const SocialNetworks = (
  <div>
    <Tooltip title="Facebook">
      <IconButton
        color="primary"
        aria-label="Facebook"
        component="a"
        href="https://www.facebook.com/tupagina"
        target="_blank"
      >
        <FacebookIcon />
      </IconButton>
    </Tooltip>

    <Tooltip title="Twitter">
      <IconButton
        color="primary"
        aria-label="Twitter"
        component="a"
        href="https://www.twitter.com/tucuenta"
        target="_blank"
      >
        <TwitterIcon />
      </IconButton>
    </Tooltip>

    <Tooltip title="Instagram">
      <IconButton
        color="primary"
        aria-label="Instagram"
        component="a"
        href="https://www.instagram.com/tucuenta"
        target="_blank"
      >
        <InstagramIcon />
      </IconButton>
    </Tooltip>
  </div>
);

export default SocialNetworks;