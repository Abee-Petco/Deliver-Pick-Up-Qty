const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//const { ItemAvailability, Store } = require('../database-mongodb/itemAvailability.js')
const {
  findAnItemAvailAndStore,
  addNewStore,
  updateStoreDetails,
  deleteClosingStore,
} = require('../models/postgreSql_model.js')
//const mongoose = require('mongoose');
//const connect = require('../database-mongodb/connect.js')
const cors = require('cors');
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Type', 'application/javascript');
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(express.static(__dirname + '/../react-client/dist'));

//READ - get item in avail stores
app.get('/availableAt/:itemId/', function (req, res) {
  console.log('svr rcvd avail req.item = ', req.params.itemId);
  let itemId = req.params.itemId;
  return findAnItemAvailAndStore(itemId)
    .then((data) => {
      console.log('server: success getting store list', data)
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    })
})

//CREATE - new store
app.post('/newStore/', function (req, res) {
  console.log('Adding new store data rcvd: ', req.body);
  let storeData = req.body;
  return addNewStore(storeData)
    .then((data) => {
      console.log('server: success adding new store', data)
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    })
});

//UPDATE - change store data
app.put('/updateStoreDetails/', function (req, res) {
  console.log('received storeName to update: ', req.body);
  let storeData = req.body;
  return updateStoreDetails(storeData)
    .then((data) => {
      console.log('server: item update success', data);
      res.status(201).send('server: store record updated');
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    })
});

//DELETE - remove closing store location
app.delete('/deleteStore/', function (req, res) {
  console.log('received store to delete', req.query)
  let storeName = req.body.store_name;
  return deleteClosingStore(storeName)
    .then((data) => {
      console.log('server: store deleted', data)
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    })
})

app.get('/:product_id', (req, res) => {
  res.sendFile(path.resolve('react-client/dist/index.html'));
});

module.exports = app



