import React, { Component } from 'react';
import { Navbar, Nav, Button, Form } from 'react-bootstrap';

class TopMenu extends Component {
    render() {
        return (
            <Navbar bg="transparent" variant="dark" expand="lg">
                <Navbar.Brand href="#home">
                <img
                    alt="MEDIUM Blockchain Explorer"
                    src="/logo.svg"
                    className="d-inline-block align-top"
                />
                </Navbar.Brand>
                <Nav className="mr-auto">
                </Nav>
                <Form inline>
                    <Button href="https://themedium.io/main/" className="mr-sm-3 form-rounded" variant="outline-light">Homepage</Button>
                    <Button href="https://themedium.io/img/down/medium_wp.pdf" className="form-rounded" variant="outline-light">Whitepaper</Button>
                </Form>
            </Navbar>
        );
    }
}

export default TopMenu;