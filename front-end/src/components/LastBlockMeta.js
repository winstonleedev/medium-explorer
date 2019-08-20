import { Card, CardGroup } from 'react-bootstrap';
import React, { Component } from 'react';
import 'holderjs';

class LastBlockMeta extends Component {
  render() {
    return (
      <CardGroup>
        <Card>
          <Card.Img variant="top" src="holder.js/100px300?auto=yes&theme=sky&text=100" />
          <Card.Body>
            <Card.Title>LAST BLOCK NUMBER</Card.Title>
            <Card.Text>
              Description
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src="holder.js/100px300?auto=yes&theme=vine&text=101" />
          <Card.Body>
            <Card.Title>LAST BLOCK TIME</Card.Title>
            <Card.Text>
              Description{' '}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src="holder.js/100px300?auto=yes&theme=social&text=102" />
          <Card.Body>
            <Card.Title>TRANSACTION COUNT</Card.Title>
            <Card.Text>
              Description
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </CardGroup>
    );
  }
}

export default LastBlockMeta;