import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EditProfilePage } from "./EditProfilePage";
import { HomePage } from "./HomePage";
import { LoggedInPage } from "./LoggedInPage";
import { LoginPage } from "./LoginPage";
import { ProfilePage } from "./ProfilePage";
import { RegistrationPage } from "./RegistrationPage";
import { SearchPage } from "./SearchPage";

export const Router = () => {
  // TODO for auth protected pages, redirect to Login Page
  // const isAuthed = true;

  // TODO do a 404 page for routes that don't match
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/registration" element={<RegistrationPage />} />

        <Route path="/" element={<LoggedInPage />}>
          {/* TODO remove dupe routes by using the useRoutes hook introduced with v6 */}
          <Route path='/home' element={<HomePage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/profile/:profileId/edit' element={<EditProfilePage /> } />
          <Route path='/profile/:profileId' element={<ProfilePage /> } />
          <Route path='/songs/:songId' element={<SearchPage /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
