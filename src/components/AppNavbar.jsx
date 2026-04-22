import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function AppNavbar({ currentUser, onLogout }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Book Club Hub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/archive">
              Archive
            </Nav.Link>
            <Nav.Link as={NavLink} to="/voting">
              Monthly Voting
            </Nav.Link>
            <Nav.Link as={NavLink} to="/progress">
              Progress
            </Nav.Link>
          </Nav>
          <Nav className="ms-lg-3 align-items-lg-center">
            {currentUser ? (
              <>
                <Navbar.Text className="me-2">Signed in as {currentUser}</Navbar.Text>
                <Button size="sm" variant="outline-light" onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Nav.Link as={NavLink} to="/auth">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar
