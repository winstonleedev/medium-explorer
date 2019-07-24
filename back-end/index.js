const fetch = require('node-fetch');

// Feed dummy data to DB
setInterval(
  () => {
    const randomTemp = (Math.random() * 5) + 10;
    fetch(
      `http://localhost:8080/v1/graphql`,
      {
        method: 'POST',
        headers: {
            'x-hasura-admin-secret': 'mylongsecretkey',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            mutation ($temp:numeric) {
                insert_temperature (
                objects: [{
                    temperature: $temp
                    location: 'London'
                }]
                ) {
                    returning {
                        recorded_at
                        temperature
                    }
                }
            }
          `,
          variables: {
            "temp": randomTemp
          }
        })
      }
    ).then((resp) => resp.json().then((respObj) => console.log(JSON.stringify(respObj, null, 2))));
  },
  2000
);