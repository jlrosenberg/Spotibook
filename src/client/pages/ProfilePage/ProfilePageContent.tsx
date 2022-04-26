import React from "react";
import { Profile } from "../../../shared/models/profile";

interface Props {
  profile: Profile;
}

export const ProfilePageContent: React.FC<Props> = ({ profile }) => {
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Profile: {profile.id}</p>
      <p>Name: {profile.name} </p>
    </div>
  );
};
