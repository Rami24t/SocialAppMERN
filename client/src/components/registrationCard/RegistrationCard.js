import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCheckbox,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import "./RegistrationCard.css";

import Stack from "@mui/material/Stack";
// import Button from '@mui/material/Button';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RegistrationCard() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const handleGHRegister = async () => {
      try {
        const response = await axios.post(baseUrl + "/users/gh-register", {
          code: paramsCode,
        });
        // console.log('response threw no error')
        if (response.data?.success) {
          navigate("/");
        } else if (response.data.error.code === 11000) {
          if (response.data.error.keyValue.username) {
            showError(
              `The account ${JSON.stringify(
                response.data.error.keyValue.username
              ).slice(1, -13)} is already registered!`
            );
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }
        }
      } catch (error) {
        console.log("error:", error);
        if (error.message === "Network Error")
          if (error.response?.data?.errors[0])
            showError(error.response.data.errors[0].msg);
      }
    };
    const paramsCode = new URLSearchParams(window.location.search).get("code");
    if (paramsCode) {
      // setData({ ...data, code: paramsCode });
      handleGHRegister(paramsCode);
    }
  }, []);

  const handleRegister = async () => {
    try {
      const response = await axios.post(baseUrl + "/users/register", data);
      // console.log('response threw no error')
      if (response.data?.success) {
        navigate("/");
      } else {
        if (response.data.errorId === 2)
          // code in this if statement could be unreachable since an error in the previous lines should cause the skipping of these parts
          alert("Username must be more than 2 characters");
        else if (response.data.error.code === 11000) {
          if (response.data.error.keyValue)
            showError(
              `The ${JSON.stringify(response.data.error.keyValue).slice(
                1,
                -1
              )} is already taken!`
            );
        }
      }
      console.log(response.data.error);
    } catch (error) {
      console.log("error:", error.message);
      if (error.message === "Network Error")
        setTimeout(() => {
          handleRegister();
        }, 1000);
      else if (error.response?.data?.errors[0])
        showError(error.response.data.errors[0].msg);
    }
  };

  // Response Alert
  const [alert, setAlert] = useState({
    severity: "",
    message: "",
    open: false,
  });
  const showError = (error) => {
    setAlert((prev) => ({
      ...prev,
      severity: "error",
      message: error,
      open: true,
    }));
  };
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert((prev) => ({ ...prev, open: false }));
  };
  // ---

  return (
    <MDBContainer fluid className="my-5 registration">
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={alert.open}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </Stack>

      <MDBRow className="g-0 align-items-center">
        <MDBCol col="6">
          <MDBCard
            className="my-5 cascading-right"
            style={{
              background: "hsla(0, 0%, 100%, 0.55)",
              backdropFilter: "blur(30px)",
            }}
          >
            <MDBCardBody className="p-5 shadow-5 text-center">
              <h2 className="fw-bold mb-5">Sign up now</h2>
              <MDBValidation>
                <MDBValidationItem
                  feedback="Please enter a valid and unique username"
                  invalid
                >
                  <MDBInput
                    wrapperClass="mb-5"
                    label="Username"
                    id="form1"
                    required
                    aria-required="true"
                    type="text"
                    name="username"
                    value={data.username}
                    onChange={(e) =>
                      setData({ ...data, username: e.target.value })
                    }
                  />
                </MDBValidationItem>
                <MDBValidationItem
                  feedback="Please enter a valid and unique email."
                  invalid
                >
                  <MDBInput
                    label="Email"
                    id="form2"
                    type="email"
                    wrapperClass="mb-5"
                    name="email"
                    required
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </MDBValidationItem>
                <MDBValidationItem feedback="Please enter password" invalid>
                  <MDBInput
                    label="Password"
                    id="form3"
                    type="password"
                    name="password"
                    wrapperClass="mb-5"
                    required
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                </MDBValidationItem>
                <div className="d-flex justify-content-center mb-4">
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Subscribe to our newsletter"
                  />
                </div>

                <MDBBtn
                  onClick={handleRegister}
                  className="w-100 mb-4"
                  size="md"
                >
                  sign up
                </MDBBtn>

                <div className="text-center">
                  <p>or sign up with:</p>

                  {/* <MDBBtn
                    tag="a"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="facebook-f" size="sm" />
                  </MDBBtn>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="twitter" size="sm" />
                  </MDBBtn> */}

                  {/* <MDBBtn
                    tag="a"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="google" size="sm" />
                  </MDBBtn> */}

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="mx-3 p-1"
                    style={{ color: "#1266f1" }}
                    onClick={() => {
                      window.location.assign(
                        `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GH_CLIENT_ID}&redirect_uri=${window.location.origin}${window.location.pathname}`
                      );
                    }}
                  >
                    <MDBIcon fab icon="github" size="xl" />
                  </MDBBtn>
                </div>
              </MDBValidation>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol>
          <img
            src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
            className="rounded-4 shadow-4"
            alt=""
            fluid
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
export default RegistrationCard;
