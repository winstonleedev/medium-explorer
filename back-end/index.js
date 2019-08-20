const fetch = require('node-fetch');
const mock = require('./mock.js');

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
        `http://localhost:8080/v1/graphql`,
        {
          method: 'POST',
          headers: {
              'x-hasura-admin-secret': 'mylongsecretkey',
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