import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

class TopMenu extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">
                    <img
                        alt="MEDIUM Blockchain Explorer"
                        src="/logo.svg"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="https://themedium.io/main/">Homepage</Nav.Link>
                        <Nav.Link href="https://themedium.io/img/down/medium_wp.pdf">Whitepaper</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default TopMenu;