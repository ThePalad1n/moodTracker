import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; 

const AuthenticatedNavbar = () => {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/moodtracker">MoodTracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/moodtracker">
                <Nav.Link>Tracker</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/journal">
                <Nav.Link>Journal</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };

export default AuthenticatedNavbar;