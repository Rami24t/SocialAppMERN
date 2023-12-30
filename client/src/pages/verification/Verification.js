import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import axios from 'axios';

const Verification = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/users/verify`, { token })
        .then(res => {
            console.log(res);
            if(res.data.success) {
                alert('Email verified successfully!\nYou can now login to your account.');
                navigate('/');                
            }
            else {
                const sendNewLink = window.confirm('Email verification failed!\nWould you like to get a new verification link?');
                if(sendNewLink) {
                    const password = window.prompt('Enter your password to get a new verification link:');
                    axios.post(`${process.env.REACT_APP_BASE_URL}/users/send-verification-link`, { token, password })
                    .then(res => {
                        console.log(res);
                        if(res.data.success) {
                            alert('New verification link sent to your email!');
                        }
                        else {
                            alert('Failed to send new verification link!');
                        }
                        navigate('/');
                    })
                }
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [])



  return (
    <div></div>
  )
}

export default Verification