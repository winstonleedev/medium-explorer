import React, { Component } from 'react';
import { InputGroup, Button, FormControl } from 'react-bootstrap';

class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionid: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ transactionid: event.target.value });
  }

  handleSubmit() {
    this.props.showTransaction(this.state.transactionid)
  }

  render() {
    return (
      <InputGroup>
        <FormControl
          placeholder="Transaction ID"
          aria-label="Transaction ID"
          onChange={this.handleChange}
          value={this.state.transactionid}
        />
        <InputGroup.Append>
          <Button onClick={this.handleSubmit}>
            Search
            </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

export default SearchField;