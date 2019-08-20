import React, { Component } from 'react';
import { Container, Alert, Button, Modal } from 'react-bootstrap';
import { Subscription } from 'react-apollo';

import gql from 'graphql-tag';

import LastBlockMeta from './components/LastBlockMeta';
import LastTransactionsList from './components/LastTransactionsList';
import SearchField from './components/SearchField';
import TopMenu from './components/TopMenu';

const BLOCK_SUBSCRIPTION= gql`
subscription {
  block(limit: 1, order_by: {num: desc}) {
    transactions {
      from
      to
      coin
      txid
      type
      version
    }
    txcount
    num
    timestamp
  }
}
`

function TransactionModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMenuOpen: false };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ isMenuOpen: true });
  }

  handleClose() {
    this.setState({ isMenuOpen: false });
  }

  render() {
    return (
      <div>
        <TopMenu />
        <Container>
          <br />
          <SearchField />
          <Subscription
            subscription={BLOCK_SUBSCRIPTION}
            fetchPolicy='cache-first'
          >
            {
              ({data, error, loading}) => {
                if (error) {
                  return <Alert variant="danger">Error { error }</Alert>;
                }
                if (loading) {
                  return <Alert variant="info">Loading</Alert>;
                }
                return (
                  <div>
                    <br />
                    <LastBlockMeta block={data.block[0]} time={new Date()}/>
                    <br />
                    <LastTransactionsList block={data.block[0]} />
                  </div>
                );
              }
            }
          </Subscription>
          <TransactionModal
            show={this.state.isMenuOpen} onHide={this.handleClose}
          />
          <Button variant="primary" onClick={this.handleOpen}>
            Launch vertically centered modal
          </Button>
        </Container>
      </div>
    );
  }
}

export default App;
