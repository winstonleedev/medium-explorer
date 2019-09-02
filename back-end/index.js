const fetch = require('node-fetch');
const grpc = require('grpc');
const util = require('util');
const atob = require('atob');

const mock = require('./mock.js');
const messages = require('./proto/honeybee_pb');
const services = require('./proto/honeybee_grpc_pb');

const HASURA_HOST = process.env.HASURA_HOST || 'localhost';
const HASURA_PORT = process.env.HASURA_PORT || '8080';
const HASURA_ACCESS_KEY = process.env.HASURA_ACCESS_KEY || 'mylongsecretkey';
const MOCK_MODE = process.env.MOCK_MODE || 'true';
const GRPC_HOST = process.env.GRPC_HOST || '0.0.0.0';
const GRPC_PORT = process.env.GRPC_PORT || '50051';

const url = `http://${HASURA_HOST}:${HASURA_PORT}/v1/graphql`

function sendData(block) {
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
}

function startMock() {
  // Feed dummy data to DB
  setInterval(
    () => mock.randomBlock().then(sendData),
    5000
  );
}

function log(object) {
  console.log(util.inspect(object));
}

function base64ToBase16(base64) {
  return atob(base64)
      .split('')
      .map(function (aChar) {
        return ('0' + aChar.charCodeAt(0).toString(16)).slice(-2);
      })
     .join('');
}

function transformTx(tx) {
  let foo = tx.toObject();
  let bar = {
    arg: '',
    coin: foo.coin,
    from: base64ToBase16(foo.from),
    to: base64ToBase16(foo.to),
    txid: mock.randomHexString(16),
    type: foo.type,
    version: foo.version
  }
  return bar;
}

function transformBlock(block) {
  let foo = block.toObject();
  // convert unix timestamp to Date
  let date = !isNaN(+foo.createtime) ? new Date(+foo.createtime * 1000) : new Date();

  let bar = {
    num: foo.blocknum,
    orderer: +foo.creator,
    transactions: {
      data: []
    },
    timestamp: date.toISOString(),
    txcount: foo.txcount
  };
  return bar;
}

function sendMetaData(call, callback) {
  let rawBlock = call.request.getMetaBlock();
  let rawTxs = call.request.getMetaTxsList();

  let transactions = rawTxs.map(element =>
    transformTx(element)
  );
  let block = transformBlock(rawBlock);
  block.transactions = {
    data: transactions
  };

  console.log("block");
  log(block);
  console.log("txs");
  log(transactions);

  sendData(mock.objectToGraphQL(block));

  let reply = new messages.Empty();
  callback(null, reply);
}

function startGrpcServer() {
  let server = new grpc.Server();
  server.addService(services.MetaDataReceiverService, {sendMetaData: sendMetaData});
  server.bind(GRPC_HOST + ':' + GRPC_PORT, grpc.ServerCredentials.createInsecure());
  server.start();
}

if (MOCK_MODE === 'true') {
  startMock();
} else {
  startGrpcServer();
}
