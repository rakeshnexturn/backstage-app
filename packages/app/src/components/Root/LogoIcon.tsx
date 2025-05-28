import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  svg: {
    width: 'auto',
    height: 28,
  },
  path: {
    fill: '#7df3e1',
  },
});

const LogoIcon = () => {
  const classes = useStyles();

  return (
    
    <svg
  width="32"
  height="32"
  viewBox="0 0 32 32"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect width="32" height="32" rx="6" fill="#6A0DAD"/>
  <path 
    d="M10 22V10H13.5L20 20V10H23V22H19.5L13 12V22H10Z" 
    fill="white"
  />
</svg>


  );
};

export default LogoIcon;
