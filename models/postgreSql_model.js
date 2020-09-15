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
  return pool.query(findItemInStore, [itemId])
    .then((data) => {
      console.log('db model processed itemId, store lookup = ', data);
      if (data) {
        console.log('store data returned: ', data);
        console.log('data in rows: ', data.rows[0]);
        let itemStoreDetails = data.rows[0];
        let storeData = {
          itemPrice: itemStoreDetails.item_price,
          storeName: itemStoreDetails.store_name,
          storeAddress: itemStoreDetails.store_address,
          storePhoneNumber: itemStoreDetails.store_phonenumber
        };
        return res.status(200).send({ itemAvailability: storeData });
      } else {
        return res.status(200).send({ itemAvailability: 'This item is unavailable at store' });
      }
    })
    .catch((err) => {
      return res.status(500).send(err);
      console.log(err);
    })
};

//CREATE - add new store record
let addNewStore = function (storeData) {
  //console.log('addNew: postgres dbmodel rcvd store data: ', storeData);
  const storeQuery = {
    text: createStore,
    values: [
      storeData.store_Name,
      storeData.store_Address,
      storeData.store_PhoneNumber
    ],
  }
  //console.log('data ready for new Store record: ', storeQuery.values);
  return pool.query(storeQuery)
    .then((res) => {
      //console.log('store obj created: ', res);
      return res.status(200).send(`${res.rows[0].store_name} created`);
    })
    .catch((err) => {
      throw err;
    })
};

//UPDATE - change stores phone number
let updateStoreDetails = function (storeDetails) {
  console.log('dbmodel received store to update: ', storeDetails);
  const updateQuery = {
    text: updateStore,
    values: [
      storeDetails.store_Name,
      storeDetails.store_Address,
      storeDetails.store_PhoneNumber
    ]
  }
  console.log('ready to send query with data: ', updateQuery);
  return pool.query(updateQuery)
    .then((res) => {
      console.log('db: success updating store data', res)
      return status(200).send(`${res.rows[0].store_name} updated`);
    })
    .catch((err) => {
      throw err;
    })
};

//DELETE - remove closing store record
let deleteClosingStore = function (storeName) {
  console.log('delete: postgres dbmodel rcvd store to delete: ', storeName)
  return pool.query(deleteStore, [storeName])
    .then((res) => {
      console.log('db: success deleted store from data', res)
      // return { [result.command]: result.rowCount };
      return res.status(200).send(`${res.rows[0].store_name} deleted`);
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