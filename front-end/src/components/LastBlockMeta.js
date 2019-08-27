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
            <Card.Text>
            <p>Block number</p>
            <h2>{ this.props.block.num }</h2>
            <small>Last updated <Moment date={this.props.time} fromNow /></small>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="text-center" text="white">
          <Card.Body>
            <Card.Text>
            <p>Block time</p>
            <h6>{ this.props.block.timestamp }</h6>
            <small>Last updated <Moment date={this.props.time} fromNow /></small>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="text-center" text="white">
          <Card.Body>
            <Card.Text>
            <p>Transaction count</p>
            <h2>{ this.props.block.txcount }</h2>
            <small>Last updated <Moment date={this.props.time} fromNow /></small>
            </Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>
    );
  }
}

export default LastBlockMeta;