import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBInput,
  MDBTextArea,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import "./ProfileEditCard.css";
import { Button } from "semantic-ui-react";
import axios from "axios";
import { SocialContext } from "../context/Context";
import ChipMultipleSelect from "../chipMultipleSelect/ChipMultipleSelect";
import { handleImageChange } from "../../utilities/handleImageChange";

export default function PersonalProfile() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { state, dispatch } = useContext(SocialContext);
  const navigate = useNavigate();
  if (!state.user.email) navigate("/");
  const [fileData, setFiledata] = useState({
    url:
      state?.user?.profileImage ||
      "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
    file: null,
  });
  const [data, setData] = useState({
    name: state?.user?.name || "",
    title: state?.user?.title || "",
    email: state?.user?.email || "",
    phone: state?.user?.phone || "",
    about: state?.user?.about || "",
    likes: state?.user?.likes || [],
    facebook: state?.user?.facebook || "",
    twitter: state?.user?.twitter || "",
    instagram: state?.user?.instagram || "",
    username: state?.user?.username || "",
  });
  const handleSave = async () => {
    const formdata = new FormData();
    if (!data.name) return alert("Name is required");
    formdata.set("name", data.name);
    formdata.set("title", data.title);
    formdata.set("email", data.email);
    formdata.set("phone", data.phone);
    formdata.set("about", data.about);
    formdata.set("likes", JSON.stringify(likes));
    formdata.set("facebook", data.facebook);
    formdata.set("twitter", data.twitter);
    formdata.set("instagram", data.instagram);
    formdata.set("username", data.username);
    if (fileData.file) formdata.set("image", fileData.file, "profileImage");

    const config = {
      Headers: { "content-type": "multipart/form-data" },
      withCredentials: true,
    };
    try {
      const response = await axios.put(
        baseUrl + "/users/profile",
        formdata,
        config
      );
      // console.log("handleSave response:", response);
      if (response.data.success) {
        dispatch({
          type: "saveProfile",
          payload: response.data.user,
        });
        navigate("/view-profile/myprofile");
      }
      else if(response.status === 401) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const [likes, setLikes] = useState(state?.user?.likes || []);

  return (
    <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
      <MDBContainer className="py-5 h-75">
      <h1 className='h3'>Edit Profile</h1>
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
              <MDBRow className="g-0">
                <MDBCol
                  md="4"
                  className="gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <label>
                    <MDBCardImage
                      src={fileData.url}
                      alt="Avatar"
                      className="hover-opacity-75 my-5 cursor-pointer rounded-circle object-cover "
                      style={{ width: "80px", height: "80px" }}
                      fluid
                    />
                    <input
                      type="file"
                      className="d-none"
                      onChange={(e) => handleImageChange(e, setFiledata)}
                    />
                  </label>
                  {/* <MDBTypography tag="h5">{data.name}</MDBTypography> */}
                  <MDBTypography tag="h5" className="w-75 m-auto">
                    <MDBInput
                      tag="h5"
                      className="text-light text-center mb-3"
                      label="Name"
                      id="name"
                      type="text"
                      name="name"
                      value={data?.name}
                      onChange={handleChange}
                    />
                  </MDBTypography>
                  {/* <MDBCardText>{data.title}</MDBCardText> */}
                  <MDBCardText className="w-75 m-auto mb-2">
                    <MDBInput
                      className="text-center text-light"
                      label="Title"
                      id="title"
                      type="text"
                      name="title"
                      value={data.title}
                      onChange={handleChange}
                    />
                  </MDBCardText>
                  <MDBIcon
                    onClick={handleSave}
                    far
                    icon="save mb-5"
                    className="hover-opacity-75"
                    style={{ cursor: "pointer" }}
                  />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4 clearfix">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1 mb-3">
                      <MDBCol size="6" className="mb-3">
                        {/* <MDBTypography tag="h6">Email</MDBTypography> */}
                        {/* <MDBCardText className="text-muted">{data.email}</MDBCardText> */}
                        <MDBInput
                          label="Email"
                          id="typeEmail"
                          type="email"
                          name="email"
                          value={data.email}
                          onChange={handleChange}
                        />
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        {/* <MDBTypography tag="h6">Phone number</MDBTypography> */}
                        {/* <MDBCardText className="text-muted">{data.phone}</MDBCardText> */}
                        <MDBInput
                          label="Phone number"
                          id="typePhone"
                          type="tel"
                          name="phone"
                          value={data.phone}
                          onChange={handleChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBTypography tag="h6">About Me</MDBTypography>
                    <MDBRow className="pt-1">
                      <MDBCol className="mb-3">
                        <MDBTextArea
                          label="Write something about yourself"
                          id="textAreaExample"
                          rows={4}
                          name="about"
                          value={data.about}
                          onChange={handleChange}
                        />{" "}
                      </MDBCol>
                    </MDBRow>
                    <ChipMultipleSelect setLikes={setLikes} likes={likes} />
                    <div className="mb-5 d-flex flex-column gap-2 clearfix">
                      <div>
                        <MDBIcon
                          className="float-end"
                          fab
                          icon="facebook me-3"
                          size="lg"
                        />
                        <MDBInput
                          label="facebook URL"
                          id="typeURL"
                          type="url"
                          name="facebook"
                          value={data.facebook || ""}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <MDBIcon
                          className="float-end"
                          fab
                          icon="twitter me-3"
                          size="lg"
                        />
                        <MDBInput
                          label="twitter URL"
                          id="typeURL"
                          type="url"
                          name="twitter"
                          value={data.twitter || ""}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <MDBIcon
                          className="float-end"
                          fab
                          icon="instagram me-3"
                          size="lg"
                        />
                        <MDBInput
                          label="instagram URL"
                          id="typeURL"
                          type="url"
                          name="instagram"
                          value={data?.instagram || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <Button onClick={handleSave} className=" float-end w-50">
                      Save
                    </Button>
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
