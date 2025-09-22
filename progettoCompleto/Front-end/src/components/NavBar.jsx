
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../../context/authContext'
import { deleteAuthor } from '../../data/author'


function NavBar() {

    const { loggeedUser, logout } = useAuthContext()

    const location = useLocation()

    const showFullNav = location.pathname === '/loginRegister'

    const deleteUser = async () => {
        if (!loggeedUser) return
        await deleteAuthor(loggeedUser._id)
        console.log(loggeedUser._id)
        logout()

    }


    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                {showFullNav ? (
                    <Navbar.Brand className="fs-2">
                        Strive Blog
                    </Navbar.Brand>
                ) : (
                    <Navbar.Brand as={Link} to="/userProfile">
                        Home
                    </Navbar.Brand>
                )}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {
                            !showFullNav && (
                                <Nav.Link to="/addPost" as={Link}>
                                    Add Post
                                </Nav.Link>
                            )
                        }
                        {
                            !showFullNav && (
                                <Nav.Link to="/viewPosts" as={Link}>
                                    View all posts
                                </Nav.Link>
                            )
                        }
                        {
                            !showFullNav && <NavDropdown title={showFullNav ? null : 'Settings'} id="basic-nav-dropdown">
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={deleteUser}>
                                    Delete Account
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={logout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar