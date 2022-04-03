import React from 'react'
import {
    NavLink,
    // Redirect,
  } from "react-router-dom";
import {Navbar,Nav,Container} from 'react-bootstrap'
function TopBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
  <Container>
  <NavLink className="nav-link text-light" activeClassName="active" to="/">Game</NavLink>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        <NavLink className="nav-link" activeClassName="active" to="/">Home</NavLink>
        <NavLink className="nav-link" activeClassName="active" to="/bets">My Bets</NavLink>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

export default TopBar