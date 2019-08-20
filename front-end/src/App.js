import React, { Component } from 'react';
import { Container, Row, Col, InputGroup, Button, FormControl } from 'react-bootstrap';
import { Subscription } from 'react-apollo';

import gql from 'graphql-tag';
import moment from 'moment';

import LastBlockMeta from './components/LastBlockMeta';
import LastTransactionsList from './components/LastTransactionsList';
import SearchField from './components/SearchField';
import TopMenu from './components/TopMenu';


const TWENTY_MIN_TEMP_SUBSCRIPTION= gql`
  subscription {
    last_1_min_temp(
      order_by: {
        five_sec_interval: asc
      }
      where: {
        location: {
          _eq: "London"
        }
      }
    ) {
      five_sec_interval
      location
      max_temp
    }
  }
`

class App extends Component {
  render() {
    return (
      <div>
        <TopMenu />
        <Container>
          <br />
          <SearchField />
          <Subscription
            subscription={TWENTY_MIN_TEMP_SUBSCRIPTION}
            fetchPolicy='cache-first'
          >
            {
              ({data, error, loading}) => {
                if (error) {
                  console.error(error);
                  return "Error";
                }
                if (loading) {
                  return "Loading";
                }
                let chartJSData = {
                  labels: [],
                  datasets: [{
                    label: "Max temperature every five seconds",
                    data: [],
                    pointBackgroundColor: [],
                    borderColor: 'brown',
                    fill: false
                  }]
                };
                data.last_1_min_temp.forEach((item) => {
                  const humanReadableTime = moment(item.five_sec_interval).format('LTS');
                  chartJSData.labels.push(humanReadableTime);
                  chartJSData.datasets[0].data.push(item.max_temp);
                  chartJSData.datasets[0].pointBackgroundColor.push('brown');
                })
                return (
                  <div>
                    <br />
                    <LastBlockMeta />
                    <br />
                    <LastTransactionsList />
                  </div>
                );
              }
            }
          </Subscription>
        </Container>
      </div>
    );
  }
}

export default App;
