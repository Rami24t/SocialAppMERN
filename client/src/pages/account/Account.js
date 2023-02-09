import React from 'react'
import { useNavigate } from 'react-router-dom'

const Account = () => {
  const navigate = useNavigate()
  navigate('/profile')

  return (<div>
    Account Settings page is not yet available in this demo version</div>
  )
}

export default Account