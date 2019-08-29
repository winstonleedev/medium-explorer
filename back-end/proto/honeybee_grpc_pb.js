// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var proto_honeybee_pb = require('../proto/honeybee_pb.js');

function serialize_honeybee_Empty(arg) {
  if (!(arg instanceof proto_honeybee_pb.Empty)) {
    throw new Error('Expected argument of type honeybee.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_honeybee_Empty(buffer_arg) {
  return proto_honeybee_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_honeybee_MetaData(arg) {
  if (!(arg instanceof proto_honeybee_pb.MetaData)) {
    throw new Error('Expected argument of type honeybee.MetaData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_honeybee_MetaData(buffer_arg) {
  return proto_honeybee_pb.MetaData.deserializeBinary(new Uint8Array(buffer_arg));
}


var MetaDataReceiverService = exports.MetaDataReceiverService = {
  sendMetaData: {
    path: '/honeybee.MetaDataReceiver/SendMetaData',
    requestStream: false,
    responseStream: false,
    requestType: proto_honeybee_pb.MetaData,
    responseType: proto_honeybee_pb.Empty,
    requestSerialize: serialize_honeybee_MetaData,
    requestDeserialize: deserialize_honeybee_MetaData,
    responseSerialize: serialize_honeybee_Empty,
    responseDeserialize: deserialize_honeybee_Empty,
  },
};

exports.MetaDataReceiverClient = grpc.makeGenericClientConstructor(MetaDataReceiverService);
