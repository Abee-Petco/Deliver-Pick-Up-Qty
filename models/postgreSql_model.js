const {
  pool,
  findItemInStore,
  createStore,
  updateStore,
  deleteStore
} = require('../database-postgreSql/index.js')

//GET/READ - find item avail in store + store details
let findAnItemAvailAndStore = function (itemId) {
  return pool.query(findItemInStore, [itemId])
    .then((data) => {
      if (data) {
        let itemStoreDetails = data.rows[0];
        let storeData = {
          storeName: itemStoreDetails.store_name,
          storeAddress: itemStoreDetails.store_address,
          storePhoneNumber: itemStoreDetails.store_phonenumber,
          availability: true,
          itemPrice: itemStoreDetails.item_price,
          itemCurrency: '$',
        };
        return { itemAvailability: storeData };
      } else {
        return { itemAvailability: 'This item is unavailable at store' };
      }
    })
    .catch((err) => {
      return err;
    })
};

//CREATE - add new store record
let addNewStore = function (storeData) {
  const storeQuery = {
    text: createStore,
    values: [
      storeData.store_Name,
      storeData.store_Address,
      storeData.store_PhoneNumber
    ],
  }
  return pool.query(storeQuery)
    .then((res) => {
      return `${res.rows[0].store_name} created`;
    })
    .catch((err) => {
      return err;
    })
};

//UPDATE - change stores phone number
let updateStoreDetails = function (storeDetails) {
  const updateQuery = {
    text: updateStore,
    values: [
      storeDetails.store_Name,
      storeDetails.store_Address,
      storeDetails.store_PhoneNumber
    ]
  }
  return pool.query(updateQuery)
    .then((res) => {
      return `${res.rows[0].store_name} updated`;
    })
    .catch((err) => {
      return err;
    })
};

//DELETE - remove closing store record
let deleteClosingStore = function (storeName) {
  return pool.query(deleteStore, [storeName])
    .then((res) => {
      return `${res.rows[0].store_name} deleted`;
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
