import React, { Component } from 'react';
import { InputGroup, Button, FormControl } from 'react-bootstrap';
import FontAwesomeIcon from 'react-fontawesome';

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
          placeholder='Transaction ID'
          aria-label='Transaction ID'
          onChange={this.handleChange}
          value={this.state.transactionid}
          className='form-rounded'
        />
        <InputGroup.Prepend>
          <Button onClick={this.handleSubmit}>
            <FontAwesomeIcon icon="search" />
          </Button>
        </InputGroup.Prepend>
      </InputGroup>
    );
  }
}

export default SearchField;