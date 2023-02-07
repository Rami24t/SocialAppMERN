import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
// import { GoogleLogin } from "react-google-login";
// import useFetch from '../hooks/useFetch'; 
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import './RegistrationCard.css';
  // const signUp = () => {
  //   const { handleGoogle, loading, error } = useFetch(
  //     baseUrl + "/users/google"
  //   );
    // useEffect(() => {
    //   /* global google */
    //   if (window.google) {
    //     google.accounts.id.initialize({
    //       client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    //       callback: handleGoogle,
    //     });
  
    //     google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
    //       // type: "standard",
    //       theme: "filled_black",
    //       // size: "small",
    //       text: "continue_with",
    //       shape: "pill",
    //     });
  
    //     // google.accounts.id.prompt()
    //   }
    // }, [handleGoogle]);

function App() {
  const baseUrl=process.env.REACT_APP_BASE_URL
  const [data, setData] = useState({
    username: '',
    email: '',
    password: ''
})
const navigate = useNavigate()

const handleRegister = async () => {
  try {
    console.log(baseUrl + '/users/register');
      const response = await axios.post(baseUrl + '/users/register', data)
      console.log("handleRegister response:", response)

      if (response.data.success) {
          navigate('/')
      } else {
          if (response.data.errorId === 2) alert('Username must be more than 2 characters')          
      }
  } catch (error) {
     console.log("error:", error.message)
  }
}

  return (
    <MDBContainer fluid className='my-5 registration'>

      <MDBRow className='g-0 align-items-center'>
        <MDBCol col='6'>

          <MDBCard className='my-5 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)',  backdropFilter: 'blur(30px)'}}>
            <MDBCardBody className='p-5 shadow-5 text-center'>

              <h2 className="fw-bold mb-5">Sign up now</h2>

              {/* <MDBRow> */}
                {/* <MDBCol className="col-auto mw-50"> */}
                  <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text'
                        name="user" 
                        value={data.username} 
                        onChange={e => setData({...data, username: e.target.value })}
                  />
                {/* </MDBCol> */}

                {/* <MDBCol className="col-auto mw-50">
                  <MDBInput wrapperClass='mb-4' label='Last name' id='form2' type='text'/>
                </MDBCol> */}
              {/* </MDBRow> */}

              <MDBInput wrapperClass='mb-4' label='Email' id='form2' type='email'
                        name="email" 
                        value={data.email} 
                        onChange={e => setData({...data, email: e.target.value })}
              />
              <MDBInput wrapperClass='mb-4' label='Password' id='form3' type='password'
                        name="password" 
                        value={data.password} 
                        onChange={e => setData({...data, password: e.target.value})}
              />

              <div className='d-flex justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
              </div>

              <MDBBtn onClick={handleRegister} className='w-100 mb-4' size='md'>sign up</MDBBtn>

              <div className="text-center">

                <p>or sign up with:</p>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='facebook-f' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='twitter' size="sm"/>
                </MDBBtn>

               <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='google' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='github' size="sm"/>
                </MDBBtn>

              </div>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol>
          <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" className="rounded-4 shadow-4"
            alt="" fluid/>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;