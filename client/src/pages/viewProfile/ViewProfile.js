import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import ProfileCard from '../../components/profileCard/ProfileCard'

const ViewProfile = () => {

    const userID = useParams().id
  return (
    <>
    <Navbar />
    <h1>Profile Page</h1>
    <p>of {userID}</p>
    <ProfileCard />
    </>

  )
}

export default ViewProfile