import React, { Component } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_TRANSACTION = gql`
query Transaction($txid: String) {
  transaction(where: {txid: {_eq: $txid}}) {
    block {
      num
      orderer
      timestamp
      hash
    }
    coin
    from
    readSet
    to
    txid
    type
    version
    writeSet
  }
}
`;

class TransactionModal extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Transaction detail
        </Modal.Title>
      </Modal.Header>

      <Query query={GET_TRANSACTION} variables={{ txid: this.props.transactionid }}>
        {({ data, loading }) => {
          if (loading) {
            return <Alert variant="info">Loading</Alert>;
          }
          console.log(data.transaction);
          if (data.transaction.length !== 1) {
            return <Alert variant="danger">Unable to find transaction</Alert>;
          }
          let transaction = data.transaction[0];

          return (
            <Modal.Body>
              <p className="text-truncate">
                TransactionID: {transaction.txid}
              </p>
              <p className="text-truncate">
                Coin: {transaction.coin}
              </p>
              <p className="text-truncate">
                From: {transaction.from}
              </p>
              <p className="text-truncate">
                To: {transaction.to}
              </p>
              <p className="text-truncate">
                Type: {transaction.type}
              </p>
              <p className="text-truncate">
                Version: {transaction.version}
              </p>
              <small>
                Information about transactions are for reference purpose only. For the most accurate information, consult the ledger
              </small>
            </Modal.Body>
          );
        }}
      </Query>

      <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
  }
}

export default TransactionModal;