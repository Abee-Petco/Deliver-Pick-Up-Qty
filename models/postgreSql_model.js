const {
  pool,
  findItemInStore,
  createStore,
  updateStore,
  deleteStore
} = require('./database-postgreSql/index.js')

//GET - find one item
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

//POSTGRES Syntax for Delete (DELETE)

DELETE FROM stores
WHERE store_Name = store.store_Name
RETURNING * ;

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

