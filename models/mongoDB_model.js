const mongoose = require('mongoose');
const connect = require('../database-mongodb/connect.js')
const { ItemAvailability, Store } = require('../database-mongodb/itemAvailability.js');

//CREATE - new store
let addNewStore = function (data) {
  return Store.insertOne({storeData})
    .then((data) => {
      console.log('db: store data with this itemId', data)
      //increase availability at one store
      //what to return to server
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    })
};

//UPDATE - change item avail
let updateAvailabilityInStore = function (itemId) {
  return ItemAvailability.findOne({ itemId }, '-id -_v')
    .populate({
      path: 'itemAvailability',
      populate: {
        path: 'storeId'
      }
    })
    .then((data) => {
      console.log('db: store data with this itemId', data)
      //increase availability at one store
      //what to return to server
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    })
};

//DELETE - look for shortcut to delete
let deleteStore = function (storeName) {
  return Store.findOneAndDelete({ storeName }, '-id -_v')
    .then((data) => {
      console.log('db: delete data with this itemId', data)
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    })
};


