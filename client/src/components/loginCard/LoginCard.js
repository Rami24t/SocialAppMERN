import React, { useContext, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import "./LoginCard.css";
import axios from "axios";
import { SocialContext } from "../context/Context";

function App() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { dispatch } = useContext(SocialContext);
  const [data, setData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const attemptLogin = async () => {
    let response = await axios.post(baseUrl + "/users/login", data, {
      withCredentials: true,
    });
    // console.log("handleLogin response:", response);
    if (response.data.success) {
      dispatch({
        type: "saveProfile",
        payload: response.data.user,
      });
      navigate("/home");
    }
    return response.data.success;
  };
  const handleLogin = async (e) => {
    if(!data.emailOrUsername || !data.password) return;
    e.preventDefault();
    e.target.disabled = true;
    try {
      const success = await attemptLogin();
      if (!success) {
        setTimeout(() => {attemptLogin()} , 1000);
      }
    } catch (error) {
      e.target.disabled = false;
      console.log(error.message);
      if(error.message === "Network Error"){
        setTimeout(() => {handleLogin()} , 2000);
      }
      if(error.response.status === 404 || error.response.status === 401)
      {
        alert("Please enter a valid email/password combination");
      }
    }
  };

  return (
    <MDBContainer className="my-5 login">
      <MDBCard>
        <MDBRow className="g-0 d-flex align-items-center">
          <MDBCol md="4">
            <MDBCardImage
              src="https://source.unsplash.com/random/600x800/?social"
              alt="phone"
              className="rounded-t-5 rounded-tr-lg-0"
              fluid
            />
          </MDBCol>

          <MDBCol md="8">
            <MDBCardBody>
              {" "}
              <MDBValidation>
                <MDBValidationItem
                  feedback="Please enter your email or username"
                  invalid
                >
                  <MDBInput
                    required
                    wrapperClass="mb-5"
                    label="Email address"
                    id="form1"
                    name="email"
                    value={data.emailOrUsername}
                    onChange={(e) =>
                      setData({ ...data, emailOrUsername: e.target.value })
                    }
                  />
                </MDBValidationItem>
                <MDBValidationItem
                  feedback="Please enter your password"
                  invalid
                >
                  <MDBInput
                    required
                    wrapperClass="mb-4"
                    label="Password"
                    id="form2"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                </MDBValidationItem>
                <div className="d-flex justify-content-between mx-4 mb-4">
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Remember me"
                  />
                  <a href="!#">Forgot password?</a>
                </div>
                <MDBBtn onClick={(e)=>handleLogin(e)} className="mb-4 w-100">
                  Log in
                </MDBBtn>
                <p className="mt-1 text-center">
                  New user? Sign up now for a new account
                </p>
                <Link to="/register">
                  <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
                </Link>
              </MDBValidation>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default App;
