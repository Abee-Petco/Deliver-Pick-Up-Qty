const {
  pool,
  findItemInStore,
  createStore,
  updateStore,
  deleteStore
} = require('../database-postgreSql/index.js')

//GET/READ - find item avail in store + store details
let findAnItemAvailAndStore = function (itemId) {
  console.log('db model rcvd item id = ', itemId)
  return pool.query(findItemInStore, { item_Id: itemId })
    .then((data) => {
      console.log('db model processed itemId, store lookup = ', data);
      if (data) {
        console.log('store data returned: ', data);
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
        return { itemAvailability: 'No items found' };
      }
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    })
};

//CREATE - add new store record
let addNewStore = function (storeData) {
  console.log('postgres dbmodel rcvd store data: ', storeData);
  return pool.query(createStore, storeData)
    .then((storeObj) => {
      console.log('store obj created: ', storeObj);
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
    store_Name: storeDetails.storeName,
    store_Address: storeDetails.storeAddress,
    store_PhoneNumber: storeDetails.storePhoneNumber
  };
  console.log('db model has vals to do lookup and update: ', filter, update);
  return pool.query(updateStore, filter, update)
    .then((updatedStore) => {
      console.log('db: success updating store data', updatedStore)
      //per Sam, do I really need this returned or just return a success code
      return updatedStore;
    })
    .catch((err) => {
      throw err;
    })
};

//DELETE - remove closing store record
let deleteClosingStore = function (store) {
  console.log('database received store to update: ', store)
  return pool.query(deleteStore, { store_Name: store })
    .then((deleteObj) => {
      console.log('db: success deleted store from data', deleteObj)
      // return { [result.command]: result.rowCount };
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
  deleteClosingStore
}


