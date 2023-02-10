import React, { useEffect, useState } from "react"
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import {useContext} from 'react';
import {SocialContext} from '../../components/context/Context';
import axios from "axios";
import { handleImageChange } from "../../utilities/handleImageChange";
import { useLocation } from "react-router-dom";
import CreatePost from "../../components/createPost/CreatePost";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const {state,dispatch} = useContext(SocialContext);

    const [fileData, setFiledata] = useState({
        url: state?.user?.coverImage || 'https://source.unsplash.com/random/1321x583/?nature',
        file: null
      })

    const pathname = useLocation().pathname;

    function updateCover(e){
        if (pathname === '/home')
    {
        handleImageChange(e,setFiledata)
        if(e.currentTarget.files[0])
        uploadCover(e);
    }
    }

    const uploadCover = async (e) => {
        const formData = new FormData();
            formData.set('image', e.currentTarget.files[0], 'coverImage')
        try{
            const res = await axios.put(`${baseUrl}/users/cover`, formData, {
                Headers: {'content-type': 'multipart/form-data'}, 
                withCredentials: true
            });
            if(res.status === 200){
                dispatch({type: 'updateCover', payload: res.data.coverImage})
               setFiledata({url: res.data.coverImage});
               // console.log("res.data.coverImage", res.data.coverImage)
            }
            else if(res.status === 401){
                dispatch({type: 'logout'});
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const showAddPost = (e) => {
        e.preventDefault();
       toggleShow();
    }
    
    useEffect(() => {
        document.title = "Social App 💗";
    }, [])

    const [staticModal, setStaticModal] = useState(false);
    const toggleShow = () => setStaticModal(!staticModal);

    const addNewPost = async (formData) => {
        // for (var pair of formData.entries()) {
        //     console.log('Pairs: ', pair[0]+ ', ' + pair[1]); 
        // }
        await axios.post(`${baseUrl}/posts/add`, formData, {
            Headers: {'content-type': 'multipart/form-data'}, 
            withCredentials: true
        })
        .then(res => {
               if(res.data.error.startsWith("Session expired"))
               {
                dispatch({type: 'logout'});
                navigate('/');
               }            
               if(res.status === 200){
                dispatch({type: 'addPost', payload: res.data});
               // toggleShow();

            }
            else if(res.status === 401){
                dispatch({type: 'logout'});
                navigate('/');
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <>
        <Header addPost={showAddPost} heading={state?.user?.name} subheading="Home" src={fileData?.url} updateCover={updateCover} />
        <CreatePost heading={state?.user?.name} avatar={state?.user?.profileImage} addNewPost={addNewPost} toggleShow={toggleShow} staticModal={staticModal} setStaticModal={setStaticModal}/>
        <div className="homeContainer">
            <Posts/>
        </div>
        </>
    )
}