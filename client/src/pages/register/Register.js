import React, { useEffect } from "react";
import RegistrationCard from "../../components/registrationCard/RegistrationCard";

const Register = () => {
  useEffect(() => {
    document.title = "Social App MERN | Sign Up";
  }, []);
  return (
    <div>
      <RegistrationCard />
    </div>
  );
};

export default Register;
