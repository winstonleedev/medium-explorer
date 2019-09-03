import React, { Component } from 'react';
import { Button, Modal, Alert, Table } from 'react-bootstrap';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_TRANSACTION = gql`
query Transaction($txid: String) {
  transaction(where: {txid: {_eq: $txid}}) {
    block {
      num
      orderer
      timestamp
    }
    coin
    from
    to
    txid
    type
    version
  }
}
`;

class TransactionModal extends Component {
  render() {
    if (!this.props.transactionid) {
      // Silently display nothing if there's no parameter
      return (
        <div></div>
      );
    } else return (
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
            if (loading || !data || !data.transaction) {
              return <Alert variant="info">Loading</Alert>;
            }

            console.log(data.transaction);
            if (data.transaction.length !== 1) {
              return <Alert variant="danger">Unable to find transaction</Alert>;
            }
            let transaction = data.transaction[0];

            return (
              <Modal.Body>
                <Table className="transaction-info" responsive>
                  <tbody>
                    <tr>
                      <th>TransactionID:</th>
                      <td className="text-truncate">{transaction.txid}</td>
                    </tr>
                    <tr>
                      <th>Coin:</th>
                      <td className="text-truncate">{transaction.coin}</td>
                    </tr>
                    <tr>
                      <th>From:</th>
                      <td className="text-truncate">{transaction.from}</td>
                    </tr>
                    <tr>
                      <th>To:</th>
                      <td className="text-truncate">{transaction.to}</td>
                    </tr>
                    <tr>
                      <th>Type:</th>
                      <td className="text-truncate">{transaction.type}</td>
                    </tr>
                    <tr>
                      <th>Version:</th>
                      <td className="text-truncate">{transaction.version}</td>
                    </tr>
                  </tbody>
                </Table>
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