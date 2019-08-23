import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';

const HASURA_HOST = process.env.HASURA_HOST || 'localhost';
const HASURA_PORT = process.env.HASURA_PORT || '8080';
const HASURA_ACCESS_KEY = process.env.HASURA_ACCESS_KEY || 'mylongsecretkey';

// Create a WebSocket link:
const link = new WebSocketLink({
  uri: `ws://${HASURA_HOST}:${HASURA_PORT}/v1/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        'x-hasura-admin-secret': HASURA_ACCESS_KEY
      }
    }
  }
})
const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache
});

ReactDOM.render(
  (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  ),
  document.getElementById('root')
);
