import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import ProfileEditCard from '../../components/profileEditCard/ProfileEditCard'

const Profile = () => {
  return (
    <div>
      <Navbar/>
      <h1>Edit Profile Page</h1>
      <ProfileEditCard />
    </div>
  )
}

export default Profile