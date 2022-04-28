import React from "react";
import { UserPayload } from "../../../shared/payloads";

interface Props {
  profile: UserPayload;
}

export const ProfilePageContent: React.FC<Props> = ({ profile }) => {
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Profile: {profile._id}</p>
      <p>Name: {profile.name} </p>
    </div>
  );
};
