import React, { useEffect } from 'react'
import LoginCard from '../../components/loginCard/LoginCard'

const Login = () => {
  useEffect(() => {
    document.title = "Social App MERN | Sign In"
  }, [])
  return (
    <div>
      <LoginCard />
    </div>
  )
}

export default Login