import React, { Component } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { Subscription } from 'react-apollo';
import Particles from 'react-particles-js';

import gql from 'graphql-tag';

import LastBlockMeta from './components/LastBlockMeta';
import LastTransactionsList from './components/LastTransactionsList';
import SearchField from './components/SearchField';
import TopMenu from './components/TopMenu';
import TransactionModal from './components/TransactionModal';

const BLOCK_SUBSCRIPTION = gql`
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      modalTransactionID: ''
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.showTransaction = this.showTransaction.bind(this);
  }

  handleOpen() {
    this.setState({ isModalOpen: true });
  }

  handleClose() {
    this.setState({ isModalOpen: false });
  }

  showTransaction(transactionid) {
    this.setState({ modalTransactionID: transactionid });
    this.handleOpen();
  }

  render() {
    return (
      <div>
        <Subscription
          subscription={BLOCK_SUBSCRIPTION}
          fetchPolicy='cache-first'
        >
          {({ data, error, loading }) => {
            if (error) {
              return <Alert variant="danger">Error {error}</Alert>;
            }
            if (loading) {
              return <Alert variant="info">Loading</Alert>;
            }
            return (
              <div>
                <Container className="top-part full-width">
                  <Particles canvasClassName="top-left backdrop" height="322px" />
                  <div className="curtain">
                    <TopMenu />
                    <br />
                    <Container>
                      <SearchField showTransaction={this.showTransaction} />
                      <br />
                      <LastBlockMeta block={data.block[0]} time={new Date()} />
                      <br />
                    </Container>
                  </div>
                </Container>
                <Container className="on-top">
                  <br />
                  <LastTransactionsList block={data.block[0]} showTransaction={this.showTransaction} />
                </Container>
              </div>
            );
          }}
        </Subscription>
        <TransactionModal
          show={this.state.isModalOpen} onHide={this.handleClose} transactionid={this.state.modalTransactionID}
        />
      </div>
    );
  }
}

export default App;
