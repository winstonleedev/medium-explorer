import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import TransactionItem from './TransactionItem';

class LastTransactionList extends Component {
  render() {
    return (
      <Table className="transaction-list" responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Version</th>
            <th>From</th>
            <th>To</th>
            <th>Coin</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.block.transactions.map((item) =>
            <TransactionItem key={item.txid} item={item} showTransaction={this.props.showTransaction} />
          )
        }
        </tbody>
      </Table>
    );
  }
}

export default LastTransactionList;