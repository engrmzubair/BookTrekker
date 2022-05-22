import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

const Menu = () => {
  return (

    <Navbar bg="light" variant="light" expand="lg" sticky="top">
      <Container>
        <NavLink className="navbar-brand" to="/">Book-TreKKer</NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">

            <NavLink className="nav-link" to="/">Home</NavLink>

            <NavLink className="nav-link" to="/signin">Signin</NavLink>

            <NavLink className="nav-link" to="/signup">Signup</NavLink>

          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

export default Menu