const express = require('express');
const bodyParser = require('body-parser');
const { ItemAvailability, Store } = require('../database-mongodb/itemAvailability.js')
const mongoose = require('mongoose');
const connect = require('../database-mongodb/connect.js')
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

app.get('/availableAt/:itemId/', function (req, res) {
  console.log('Trying to fetch data', req.params.itemId);
  return ItemAvailability.findOne({ itemId: req.params.itemId }, '-_id -__v')
    .populate({
      path: 'itemAvailability',
      populate: {
        path: 'storeId'
      }
    })
    .then((data) => {
      if (data) {
        let storeData = data.itemAvailability.map((store) => {
          return {
            storeName: store.storeId.storeName,
            storeAddress: store.storeId.storeAddress,
            storePhoneNumber: store.storeId.storePhoneNumber,
            availability: store.availability
          }
        })
        res.status(200).send({ itemAvailability: storeData });
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    })
})

//CREATE - new store
app.post('/newStore/', function (req, res) {
  console.log('Adding new store data rcvd: ', req)
  let storeData = req.body;
  return addNewStore(storeData)
    .then((res) => {
      console.log('server: success adding new store', res)
      res.status(201).send('server: record created');
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    })
});

//UPDATE - change item availability
app.put('/updateRecord/:itemId/', function (req, res) {
  console.log('received itemId 4 update: ', req.params.itemId);
  let item = req.params.itemId;
  return updateAvailabilityInStore(item)
    .then((data) => {
      console.log('server: item update success', data);
      res.status(201).send('server: item record updated');
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    })
});

//DELETE - remove closing store
app.delete('/deleteStore/', function (req, res) {
  console.log('received store to delete', req)
  let storeName = req.params.storeName;
  return deleteStore(storeName)
    .then((data) => {
      console.log('server: store deleted', data)
      res.status(201).send('server: record deleted');
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    })
})

module.exports = app



