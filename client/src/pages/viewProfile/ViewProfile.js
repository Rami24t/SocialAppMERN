import React from 'react'
import { useParams } from 'react-router-dom'

const ViewProfile = () => {

    const userID = useParams().id
  return (
    <>
    <div>ViewProfile</div>
    <p>of {userID}</p>
    </>

  )
}

export default ViewProfile