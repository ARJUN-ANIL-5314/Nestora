// utils/getMdlWidth.js
import { useMediaQuery } from '@mui/material';

export const useMdlWidth = () => {
  const isSmallScreen = useMediaQuery('(max-width:380px)');
  const isMediumScreen = useMediaQuery('(max-width:896px)');

  let mdlWidth;

  if (isSmallScreen) {
    mdlWidth = '95%';
  } else if (isMediumScreen) {
    mdlWidth = '80%';
  } else {
    mdlWidth = '60%';
  }

  return mdlWidth;
};
