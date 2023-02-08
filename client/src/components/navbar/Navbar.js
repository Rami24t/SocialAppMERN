import React, {useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Link, NavLink} from 'react-router-dom';
import './Navbar.css';
import {SocialContext} from '../context/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function OffcanvasExample() {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const {state,dispatch} = useContext(SocialContext);
  const loggedIn = state?.user?.email ? true : false;

  const  handleLogOut = async () => {
   const response = await axios.get(baseUrl + '/users/logout', {withCredentials: true})
    if (response.status === 200) {
    dispatch({type: 'logout'})
    navigate('/')
  }
  else {
    console.log('error logging out')
  }
}

  return (
    <>
      {['xl'].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="">
          <Container fluid>
            <Navbar.Brand><Link to='/'>Social App</Link></Navbar.Brand>
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
                  <Nav.Link><NavLink to="/home">Home</NavLink></Nav.Link>
                  {/* <Nav.Link href="#action2">Link</Nav.Link> */}
                  <NavDropdown
                    title="Settings"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item><NavLink to="/profile">Edit Profile</NavLink></NavDropdown.Item>
                    <NavDropdown.Item>
                    <NavLink to="/view-profile/myprofile">View Profile</NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                    <NavLink to="/account">Account settings</NavLink>
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
                  <NavLink to="/">
                    <Button onClick={loggedIn ? handleLogOut : null} variant="outline-success">Log {loggedIn ? 'out' : 'in'}  </Button>
                  </NavLink>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
export default OffcanvasExample;