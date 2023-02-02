import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import ProfileCard from '../../components/profileCard/ProfileCard'
import { useContext } from 'react';
import { SocialContext } from '../../context/Context';
import axios from 'axios';

const ViewProfile = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  let data = {};
  const {state} = useContext(SocialContext);
  const {id} = useParams()
  console.log("ViewProfile id:", id)
  if (id === 'myprofile') {
     data = state.user;
  }
  else {
     data = getProfile();
  }
    async function getProfile() {
      const response = await axios.get(baseUrl + "/users/profile/" + id, {withCredentials: true})
      console.log("getProfile response:", response)
      return response.data.user
    }

  return (
    <>
    <Navbar />
    <ProfileCard data={data}/>
    </>

  )
}

export default ViewProfile