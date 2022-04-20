import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { LoggedInPage } from "./LoggedInPage";
import { LoginPage } from "./LoginPage";
import { RegistrationPage } from "./RegistrationPage";

export const Router = () => {
  // TODO for auth protected pages, redirect to Login Page
  const isAuthed = true;

  // TODO do a 404 page for routes that don't match
  return (
    <BrowserRouter>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/registration">
        <RegistrationPage />
      </Route>
      <Route path="/" element={<LoggedInPage />}></Route>
    </BrowserRouter>
  );
};
