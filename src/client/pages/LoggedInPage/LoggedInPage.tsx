import { makeStyles } from '@mui/styles';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../../components/NavBar';

const useStyles = makeStyles({
  root: {
    background: "#efefef",
    height: '100%',
    width: '100%',
  }
})

export const LoggedInPage = () => {
  const classes = useStyles()
  return (
    <>
      <NavBar />
      <div className={classes.root}>
        <Outlet />
      </div>
    </>
  );
}