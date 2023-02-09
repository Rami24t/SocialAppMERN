import React, {useContext, useState} from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import {Link, useNavigate} from 'react-router-dom';
import './LoginCard.css';
import axios from 'axios';
import {SocialContext} from '../context/Context';

function App() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const {dispatch} = useContext(SocialContext);
  const [data, setData] = useState({
    emailOrUsername: '',
    password: ''
})
const handleLogin = async () => {
  try{
  const response = await axios.post(baseUrl + "/users/login", data,  {withCredentials: true})
  console.log("handleLogin response:", response)
  if (response.data.success) {
      dispatch({
          type: 'saveProfile',
          payload: response.data.user
      })    
      navigate('/home')
  }
} catch (error) {
  console.log(error)
}
}


  return (
    <MDBContainer className='my-5 login'>
      <MDBCard>

        <MDBRow className='g-0 d-flex align-items-center'>

          <MDBCol md='4'>
            <MDBCardImage src='https://source.unsplash.com/random/600x800/?social' alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
          </MDBCol>

          <MDBCol md='8'>

            <MDBCardBody>

              <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'
                        name="email" 
                        value={data.emailOrUsername} 
                        onChange={e => setData({...data, emailOrUsername: e.target.value })}
              />
              <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'
                        name="password" 
                        value={data.password} 
                        onChange={e => setData({...data, password: e.target.value})}
              />

              <div className="d-flex justify-content-between mx-4 mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                <a href="!#">Forgot password?</a>
              </div>
              <MDBBtn onClick={handleLogin} className="mb-4 w-100">Log in</MDBBtn>


                <p className='mt-1 text-center' >New user?  Sign up now for a new account</p>
              <Link to="/register"><MDBBtn className="mb-4 w-100">Sign up</MDBBtn></Link>
              

            </MDBCardBody>

          </MDBCol>

        </MDBRow>

      </MDBCard>
    </MDBContainer>
  );
}

export default App;