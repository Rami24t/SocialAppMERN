import React, { useEffect } from "react";
import ProfileEditCard from "../../components/profileEditCard/ProfileEditCard";

const Profile = () => {
  useEffect(() => {
    document.title = "Social App 💗 Edit Profile";
  }, []);

  return (
    <div>
      <ProfileEditCard />
    </div>
  );
};

export default Profile;
