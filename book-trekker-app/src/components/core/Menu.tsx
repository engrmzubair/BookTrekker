import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks';
import { currentUser } from '../user/userSlice';
import { itemTotal } from './cart/cartHelpers';

const Menu = () => {

  const user = useAppSelector(currentUser);

  return (

    <Navbar bg="secondary" variant="dark" expand="lg" sticky="top">
      <Container>
        <NavLink className="navbar-brand" to="/">Book-TreKKer</NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="ms-auto">

            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/shop">Shop</NavLink>
            <NavLink className="nav-link" to="/cart">
              Cart
              { itemTotal() > 0 && <sup>
                <Badge pill bg="info">
                  { itemTotal() }
                </Badge>
              </sup> }
            </NavLink>

            { user && <NavLink className="nav-link" to="/user/dashboard">Dashboard</NavLink> }

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