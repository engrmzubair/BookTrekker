import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks';
import { currentUser } from '../user/userSlice';

const Menu = () => {

  const user = useAppSelector(currentUser);

  return (

    <Navbar bg="secondary" variant="dark" expand="lg" sticky="top">
      <Container>
        <NavLink className="navbar-brand" to="/">Book-TreKKer</NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">

            <NavLink className="nav-link" to="/">Home</NavLink>

            { !user && (
              <React.Fragment>
                <NavLink className="nav-link" to="/signin">Signin</NavLink>

                <NavLink className="nav-link" to="/signup">Signup</NavLink>
              </React.Fragment>) }

            { user && <NavLink className="nav-link" to="/signout">Signout</NavLink> }

          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

export default Menu