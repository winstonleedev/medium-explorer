const fetch = require('node-fetch');
const mock = require('./mock.js');

const HASURA_HOST = process.env.HASURA_HOST || 'localhost';
const HASURA_PORT = process.env.HASURA_PORT || '8080';
const HASURA_ACCESS_KEY = process.env.HASURA_ACCESS_KEY || 'mylongsecretkey';

const url = `http://${HASURA_HOST}:${HASURA_PORT}/v1/graphql`

// Feed dummy data to DB
setInterval(
  () => {
    mock.randomBlock().then((block) => {
      let query = `
      mutation {
        insert_block (objects: ${block})
        {
          returning {
            num
          }
        }
      }
      `
      fetch(
        url,
        {
          method: 'POST',
          headers: {
              'x-hasura-admin-secret': HASURA_ACCESS_KEY,
              'content-type': 'application/json'
          },
          body: JSON.stringify({
            query: query
          })
        }
      )
      .then(
        (resp) => resp
          .json()
          .then(
            (respObj) => console.log(JSON.stringify(respObj, null, 2))
          )
      )
      .catch(
        (error) => console.error(error)
      );
    });
  },
  5000
);