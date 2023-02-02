import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBInput, MDBTextArea, MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import './ProfileEditCard.css';
import { Button } from 'semantic-ui-react';
import axios from 'axios'
import {SocialContext} from '../../context/Context';
import ChipMultipleSelect from '../chipMultipleSelect/ChipMultipleSelect';  

export default function PersonalProfile() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const {state, dispatch} = useContext(SocialContext)
  const navigate = useNavigate();
if(!state.user)
  navigate('/')
  const [fileData, setFiledata] = useState({
      url: state?.user?.image || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp',
      file: null
  })
  const [data, setData] = useState({
    email: state?.user?.email,
    phone: state?.user?.phone,
    about: state?.user?.about,
    likes: state?.user?.likes || [],
    facebook: state?.user?.facebook,
    twitter: state?.user?.twitter,
    instagram: state?.user?.instagram,
    username: state?.user?.username,
    gender: state?.user?.gender || "",
})
const handleSave = async () => {
  const formdata = new FormData()
  formdata.set('email', data.email)
  formdata.set('phone', data.phone)
  formdata.set('username', data.username)
  formdata.set('about', data.about)
  formdata.set('gender', data.gender)
  formdata.set('likes', JSON.stringify(likes))

  if (fileData.file) formdata.set('image', fileData.file, 'profileImage')

  const config = {
      Headers: {'content-type': 'multipart/form-data'}, 
      withCredentials: true
  }

  const response = await axios.post(baseUrl + '/users/profile', formdata, config)
  console.log("🚀 ~ handleSave ~ response", response)

  if (response.data.success) dispatch({
      type: 'userSaved',
      payload: response.data.user
  })
}

const handleImageChange = e => {
  console.log("🚀 ~ handleImageChange ~ e", e.currentTarget.files[0])
  
  setFiledata({
      url: URL.createObjectURL(e.currentTarget.files[0]),
      file: e.currentTarget.files[0] 
  })
}
const [likes, setLikes] = useState([]);


  return (
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <label>
                  <MDBCardImage
                    src={fileData.url}
                    alt="Avatar" className="hover-opacity-75 my-5 rounded-circle cursor-pointer" style={{ width: '80px' }} fluid
                     />
                     <input type='file' className='d-none' onChange={handleImageChange}/>
                  </label>
                  <MDBTypography tag="h5">Marie Horwitz</MDBTypography>
                  <MDBTypography tag="h5" className='w-75 m-auto'>
                  <MDBInput className='text-light text-center mb-3' label='Name' id='name' type='text' /></MDBTypography>
                  <MDBCardText>Web Designer</MDBCardText>
                  <MDBCardText className='w-75 m-auto mb-2'><MDBInput className='text-center text-light' label='Title' id='title' type='text' /></MDBCardText>
                  <MDBIcon onClick={handleSave} far icon="save mb-5"
                  className='hover-opacity-75' style={{cursor: 'pointer'}} />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4 clearfix">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1 mb-3">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">info@example.com</MDBCardText>
                        <MDBInput label='Email' id='typeEmail' type='email' />
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">123 456 789</MDBCardText>
                        <MDBInput label='Phone number' id='typePhone' type='tel' />
                      </MDBCol>
                    </MDBRow>

                    <MDBTypography tag="h6">About Me</MDBTypography>
                    
                    <MDBRow className="pt-1">
                      <MDBCol className="mb-3">
                      <MDBTextArea label='Write something about yourself' id='textAreaExample' rows={4} />                      </MDBCol>
                    </MDBRow>
                    <ChipMultipleSelect setLikes={setLikes} likes={likes} />
                    <div className="mb-5 d-flex flex-column gap-2 clearfix">
                    <div>
                      <MDBIcon className="float-end" fab icon="facebook me-3" size="lg" />
                      <MDBInput label='facebook URL' id='typeURL' type='url' /></div>
                      <div>
                      <MDBIcon className='float-end' fab icon="twitter me-3" size="lg" />
                      <MDBInput label='twitter URL' id='typeURL' type='url' />
                    </div>
                    <div>
                      <MDBIcon className='float-end' fab icon="instagram me-3" size="lg" />
                      <MDBInput label='instagram URL' id='typeURL' type='url' /></div>
                    </div>
                    <Button onClick={handleSave} className=' float-end w-50'>Save</Button>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}