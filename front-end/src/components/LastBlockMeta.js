import { Card, CardGroup } from 'react-bootstrap';
import React, { Component } from 'react';
import Moment from 'react-moment';
import 'holderjs';

class LastBlockMeta extends Component {
  render() {
    return (
      <CardGroup>
        <Card className="text-center">
          <Card.Body>
            <Card.Title><big>{ this.props.block.num }</big></Card.Title>
            <Card.Text>
            Block number
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated <Moment date={this.props.time} fromNow /></small>
          </Card.Footer>
        </Card>
        <Card className="text-center">
          <Card.Body>
            <Card.Title>{ this.props.block.timestamp }</Card.Title>
            <Card.Text>
            Block time
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated <Moment date={this.props.time} fromNow /></small>
          </Card.Footer>
        </Card>
        <Card className="text-center">
          <Card.Body>
            <Card.Title>{ this.props.block.txcount }</Card.Title>
            <Card.Text>
            Transaction count
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated <Moment date={this.props.time} fromNow /></small>
          </Card.Footer>
        </Card>
      </CardGroup>
    );
  }
}

export default LastBlockMeta;