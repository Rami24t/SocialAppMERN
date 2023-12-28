import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { SocialContext } from "../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OffcanvasExample() {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { state, dispatch } = useContext(SocialContext);
  const loggedIn = Boolean(state?.user?.email || state?.user?.gitHubId);

  const handleLogOut = async () => {
    const response = await axios.get(baseUrl + "/users/logout", {
      withCredentials: true,
    });
    if (response.status === 200) {
      dispatch({ type: "logout" });
      navigate("/");
    }
    // else {
    // console.log('error logging out')
    // }
  };

  const expand = "xl";
  return (
    <>
      <Navbar key={expand} bg="light" expand={expand} className="gradient-nav">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/" exact>
            Social App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}>
            <i className="fa-solid fa-bars" />
          </Navbar.Toggle>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Social App
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link
                  as={NavLink}
                  to="/home"
                  activeClassName="activeHome"
                  exact
                >
                  Home
                </Nav.Link>
                {/* <Nav.Link href="#action2">Link</Nav.Link> */}
                <NavDropdown
                  title="Settings"
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                >
                  <NavDropdown.Item
                    as={NavLink}
                    to="/profile"
                    activeClassName="active"
                    exact
                  >
                    Edit Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={NavLink}
                    to="/view-profile/myprofile"
                    activeClassName="active"
                    className=" full-width full "
                    exact
                  >
                    View Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={NavLink}
                    to="/account"
                    activeClassName="active"
                    exact
                  >
                    Account settings
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                {/* <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  /> */}

                <Button
                  as={NavLink}
                  to="/"
                  variant="secondary"
                  className="hover-opacity-75"
                  onClick={loggedIn ? handleLogOut : null}
                >
                  Log {loggedIn ? "out" : "in"}{" "}
                </Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
export default OffcanvasExample;
