import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../../components/NavBar';

export const LoggedInPage = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}