const mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
const connect = require('../database-mongodb/connect.js')
const { ItemAvailability, Store } = require('../database-mongodb/itemAvailability.js');

//GET - find one item
let findAnItemAvailAndStore = function (itemId) {
  console.log('db model rcvd item id = ', itemId)
  return ItemAvailability.findOne({ itemId: itemId }, '-_id -__v')
    .populate({
      path: 'itemAvailability',
      populate: {
        path: 'storeId'
      }
    })
    .then((data) => {
      console.log('db model processed itemId, store lookup = ', data);
      if (data) {
        let storeData = data.itemAvailability.map((store) => {
          return {
            storeName: store.storeId.storeName,
            storeAddress: store.storeId.storeAddress,
            storePhoneNumber: store.storeId.storePhoneNumber,
            availability: store.availability
          }
        })
        return { itemAvailability: storeData };
      } else {
        return { itemAvailability: 'No items found'};
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

//UPDATE - change stores phone number
let updateStoreDetails = function (storeDetails) {
  console.log('database received store to update: ', storeDetails);
  const filter = { storeName: storeDetails.storeName };
  const update = {
    storeName: storeDetails.storeName,
    storeAddress: storeDetails.storeAddress,
    storePhoneNumber: storeDetails.storePhoneNumber
  };
  console.log('db model has vals to do lookup and update: ', filter, update);
  return Store.findOneAndUpdate(filter, update, { new: true})
    .then((updatedStore) => {
      console.log('db: success updating store data', updatedStore)
      return updatedStore;
    })
    .catch((err) => {
      throw err;
    })
};

//DELETE - remove closing store location
let deleteStore = function (store) {
  console.log('database received store to update: ', store)
  return Store.findOneAndDelete({ storeName: store })
    .then((deleteObj) => {
      console.log('db: success deleted store from data', deleteObj)
      return deleteObj;
    })
    .catch((err) => {
      throw err;
    })
};

module.exports = {
  findAnItemAvailAndStore,
  addNewStore,
  updateStoreDetails,
  deleteStore
}