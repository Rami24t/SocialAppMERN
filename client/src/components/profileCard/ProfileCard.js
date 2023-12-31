import React from "react";
import {
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
import "./ProfileCard.css";
import { Link } from "react-router-dom";
import ChipMultipleSelect from "../chipMultipleSelect/ChipMultipleSelect";
import { Interweave } from "interweave";
import { UrlMatcher } from "interweave-autolink";

export default function PersonalProfile({ data }) {
  return (
    <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
      <MDBContainer className="py-5 h-75">
        <h1 className="h3">View Profile</h1>
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
                  <MDBCardImage
                    src={
                      data?.profileImage.replace(
                        "/upload",
                        "/upload/c_fill,g_auto,h_100,w_100/f_auto,q_auto"
                      ) ||
                      "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    }
                    alt="Avatar"
                    className="my-5 rounded-circle object-cover"
                    style={{ width: "80px", height: "80px" }}
                    fluid
                  />
                  <MDBTypography tag="h5">
                    {data?.name || "Full Name"}
                  </MDBTypography>
                  <MDBCardText>{data?.title || "My Title"}</MDBCardText>
                  {data?.verified ? (
                    <p className="text-light">
                      <MDBIcon icon="check-circle" />
                      {` Verified (${data?.gitHubId ? "GitHub" : "Email"})`}
                    </p>
                  ) : (
                    <p className="text-danger">
                      <MDBIcon icon="times-circle" />
                      {` (${data.gitHubId ? "GitHub" : "E-Mail"}) Not Verified`}
                    </p>
                  )}
                  <Link to="/profile">
                    <MDBIcon far icon="edit mb-5" />
                  </Link>
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-2" />
                    <MDBRow className="pt-1 mb-2">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">
                          {data?.email || "my-email@example.com"}
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">
                          {data?.phone || "[My Phone Number]"}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBTypography tag="h6">About Me</MDBTypography>
                    <hr className="mt-0 mb-2" />
                    <MDBRow className="pt-1 mb-5">
                      <MDBCardText className="text-muted">
                        <Interweave
                          newWindow={true}
                          content={data?.about || "My about me section..."}
                          matchers={[new UrlMatcher("url")]}
                        />
                      </MDBCardText>
                    </MDBRow>
                    {data?.likes?.length > 0 ? (
                      <ChipMultipleSelect likes={data?.likes} />
                    ) : null}
                    <div className="d-flex justify-content-start">
                      {data?.facebook && (
                        <a
                          href={data?.facebook || "#facebook"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MDBIcon fab icon="facebook me-3" size="lg" />
                        </a>
                      )}
                      {data?.github && (
                        <a
                          href={data?.github || "#github"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MDBIcon fab icon="github me-3" size="lg" />
                        </a>
                      )}
                      {data?.instagram && (
                        <a
                          href={data?.instagram || "#instagram"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MDBIcon fab icon="instagram me-3" size="lg" />
                        </a>
                      )}
                    </div>
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
