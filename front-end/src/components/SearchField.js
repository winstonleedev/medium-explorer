import React, { Component } from 'react';
import { Container, Row, Col, InputGroup, Button, FormControl } from 'react-bootstrap';

class SearchField extends Component {
    render() {
        return (
            <div>
                <InputGroup>
                <FormControl
                    placeholder="Transaction ID"
                    aria-label="Transaction ID"
                />
                <InputGroup.Append>
                <Button variant="outline-secondary">Search</Button>
                </InputGroup.Append>
                </InputGroup>
            </div>
        );
    }
}

export default SearchField;