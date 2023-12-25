import React from "react";
import { useParams } from "react-router-dom";
import ProfileCard from "../../components/profileCard/ProfileCard";
import { useContext, useEffect } from "react";
import { SocialContext } from "../../components/context/Context";
// import axios from 'axios';

const ViewProfile = () => {
  useEffect(() => {
    document.title = "Social App 💗 View Profile";
  }, []);
  // const baseUrl = process.env.REACT_APP_BASE_URL;
  let data = {};
  const { state } = useContext(SocialContext);
  const { id } = useParams();
  // console.log("ViewProfile id:", id)
  if (id === "myprofile" && state.user) {
    data = state.user;
  } else if (id) {
    data = state.viewProfileData;
    //  console.log("ViewProfile data:", data)
  }
  // async function getProfile() {
  //   const response = await axios.get(baseUrl + "/users/profile/" + id, {withCredentials: true})
  //   console.log("getProfile response:", response)
  //   return response.data.user
  // }

  return (
    <>
      <ProfileCard data={data} />
    </>
  );
};

export default ViewProfile;
