import React, { Component } from 'react';

class TransactionItem extends Component {
  render() {
    return (
      <tr>
        <td className="text-monospace">
          <a onClick={() => this.props.showTransaction(this.props.item.txid)}>
          { this.props.item.txid.substring(0, 10) + '...' }
          </a>
        </td>
        <td>{ this.props.item.type }</td>
        <td>{ this.props.item.version }</td>
        <td className="text-monospace">{ this.props.item.from.substring(0, 10) + '...' }</td>
        <td className="text-monospace">{ this.props.item.to.substring(0, 10) + '...' }</td>
        <td>{ this.props.item.coin }</td>
      </tr>
    );
  }
}

export default TransactionItem;