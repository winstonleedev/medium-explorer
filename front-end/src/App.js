import React, { Component } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { Subscription } from 'react-apollo';

import gql from 'graphql-tag';

import LastBlockMeta from './components/LastBlockMeta';
import LastTransactionsList from './components/LastTransactionsList';
import SearchField from './components/SearchField';
import TopMenu from './components/TopMenu';
import TransactionModal from './components/TransactionModal';

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
        <TopMenu />
        <Container>
          <br />
          <SearchField showTransaction={this.showTransaction} />
          <Subscription
            subscription={BLOCK_SUBSCRIPTION}
            fetchPolicy='cache-first'
          >
            {({data, error, loading}) => {
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
                  <LastTransactionsList block={data.block[0]} showTransaction={this.showTransaction} />
                </div>
              );
            }}
          </Subscription>
          <TransactionModal
            show={this.state.isModalOpen} onHide={this.handleClose} transactionid={this.state.modalTransactionID}
          />
        </Container>
      </div>
    );
  }
}

export default App;
