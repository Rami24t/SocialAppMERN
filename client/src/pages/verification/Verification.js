import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PasswordForm from "./PasswordForm";
import { MDBContainer } from "mdb-react-ui-kit";

const Verification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // setShowForm(false);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/users/send-verification-link`, {
        token,
        password,
      })
      .then((res) => {
        // console.log(res);
        if (res.data.success) {
          alert("New verification link sent to your email!");
        } else {
          alert("Failed to send new verification link!");
        }
        navigate("/");
      });
  };
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/users/verify`, { token })
      .then((res) => {
        // console.log(res);
        if (res.data.success) {
          alert(
            "Email verified successfully!\nYou can now login to your account."
          );
          navigate("/");
        } else {
          const sendNewLink = window.confirm(
            "Email verification failed!\nWould you like to get a new verification link?"
          );
          if (sendNewLink) {
            setShowForm(true);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate, token]);

  const [showForm, setShowForm] = useState(false);

  return (
    <MDBContainer className="my-5 login">
      {showForm && (
        <PasswordForm
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          cancel={() => navigate("/")}
        />
      )}
    </MDBContainer>
  );
};

export default Verification;
