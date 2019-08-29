const fs = require('fs');
const fp = fs.promises;
const util = require('util');

const COUNT_FILE_NAME = '.count';

const randomHexString = (length) =>
  require('crypto').randomBytes(length).toString('hex');

function objectToGraphQL(object) {
  return util.inspect(object, {
    depth: 5,
    compact: false
  }).replace(/\'/g, '"');
}

exports.objectToGraphQL = objectToGraphQL;

function randomInt(max) {
  return parseInt((Math.random() * max))
}

exports.randomTransaction = (blockNum) => {
  return {
    arg: '',
    coin: randomInt(9999999),
    from: randomHexString(20),
    to: randomHexString(20),
    readSet: '',
    writeSet: '',
    txid: randomHexString(32),
    type: 0,
    version: 0
  }
}

async function getBlockNum() {
  let blockNum = await fp
    .readFile(COUNT_FILE_NAME)
    .catch(err => {
      console.log(COUNT_FILE_NAME + ' not found');
      return 0;
    });

  if (isNaN(blockNum)) {
    blockNum = 0;
  } else {
    blockNum = parseInt(blockNum);
  }

  fs.writeFile(COUNT_FILE_NAME, ++blockNum, () => { });
  return blockNum;
}

exports.randomBlock = async () => {
  let blockNum = 0;
  blockNum = await getBlockNum();

  const randomOrderer = randomInt(5);

  let transactions = [];
  let txcount = randomInt(5) + 5;
  for (let i = 0; i < txcount; i++) {
    transactions.push(exports.randomTransaction(blockNum));
  }

  return objectToGraphQL({
    hash: randomHexString(32),
    num: blockNum,
    orderer: randomOrderer,
    transactions: {
      data: transactions
    },
    timestamp: (new Date()).toISOString(),
    txcount: transactions.length
  });
}

exports.randomHexString = randomHexString;
