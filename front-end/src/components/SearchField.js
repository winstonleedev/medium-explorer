import React, { Component } from 'react';
import { InputGroup, Button, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionid: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(event) {
    this.setState({ transactionid: event.target.value });
  }

  handleSubmit() {
    this.props.showTransaction(this.state.transactionid)
  }

  handleKeyPress(event) {
    if (event.charCode === 13) {
      this.handleSubmit();
    }
  }

  render() {
    return (
      <InputGroup>
        <InputGroup.Prepend>
          <Button
            variant="outline-light"
            onClick={this.handleSubmit}
            className='form-rounded'
          >
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </InputGroup.Prepend>
        <FormControl
          placeholder='Transaction ID'
          aria-label='Transaction ID'
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          value={this.state.transactionid}
          className='form-rounded'
        />
      </InputGroup>
    );
  }
}

export default SearchField;