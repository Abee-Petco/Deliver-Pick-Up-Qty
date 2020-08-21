const mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
const connect = require('../database-mongodb/connect.js')
const { ItemAvailability, Store } = require('../database-mongodb/itemAvailability.js');

//GET - find one item
let findAnItemAvailAndStore = function (itemId) {
  return ItemAvailability.findOne({ itemId: itemId }, '-_id -__v')
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
};

//CREATE - new store
let addNewStore = function (storeData) {
  console.log('mongo:dbmodel rcvd store data: ', storeData);
  return Store.create(storeData)
    .then((storeObj) => {
      return storeObj;
    })
    .catch((err) => {
      throw err;
    })
};

//UPDATE - change item avail
let updateAvailabilityInStore = function (itemId) {
  return ItemAvailability.findOne({ itemId: itemId }, '-id -_v')
    .populate({
      path: 'itemAvailability',
      populate: {
        path: 'storeId'
      }
    })
    .then((data) => {
      console.log('db: store data with this itemId', data)
      if (data) {
        // update store details or increase avail of an item
        // save change (see if findOne() is best solution)
        res.status(200).send({ itemAvailability: data });
      } else {
        res.sendStatus(404);
      }
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

module.exports = {
  findAnItemAvailAndStore,
  addNewStore,
  updateAvailabilityInStore,
  deleteStore
}