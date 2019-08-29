import { Card, CardDeck } from 'react-bootstrap';
import React, { Component } from 'react';
import Moment from 'react-moment';
import 'holderjs';

class LastBlockMeta extends Component {
  render() {
    return (
      <CardDeck>
        <Card className="text-center" text="white">
          <Card.Body>
            <Card.Text>Block number</Card.Text>
            <Card.Title>{ this.props.block.num }</Card.Title>
          </Card.Body>
        </Card>
        <Card className="text-center" text="white">
          <Card.Body>
            <Card.Text>Block time</Card.Text>
            <Card.Title className="time-small">{ this.props.block.timestamp }</Card.Title>
            <small>Last updated <Moment date={this.props.time} fromNow /></small>
          </Card.Body>
        </Card>
        <Card className="text-center" text="white">
          <Card.Body>
            <Card.Text>Transaction count</Card.Text>
            <Card.Title>{ this.props.block.txcount }</Card.Title>
          </Card.Body>
        </Card>
      </CardDeck>
    );
  }
}

export default LastBlockMeta;