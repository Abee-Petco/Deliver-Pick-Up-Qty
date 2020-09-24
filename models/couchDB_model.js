//CouchDB Syntax for Read (GET) **************************************
//ATTEMPT 1 as two different requests
curl -X GET http://127.0.0.1:5984/items/00050c6501cf1ad865bd725c61000b75
//HTTP Response:
{ "_id": "00050c6501cf1ad865bd725c61000b75", "_rev": "1-bb009c5f484a8f0c2e3e37ed019f37be", "item_Availability": " false ", "item_Id": "2846754 ", "item_Price": " 18.00", "item_StoreId": " 1216 " }

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

//CouchDB Syntax for Create (POST)************************************
curl -X PUT http://127.0.0.1:5984/stores/"1501" -d '{"store_Address": " 444 Couch Drive, Sofa, IN, 44444 ", "store_Id": "1501 ", "store_Name": " CouchBum ", "store_PhoneNumber": " 777-555-7777" }'

//HTTP Response:
{"ok":true,"id":"1501","rev":"1-d61d6c905f4bb0981756c2d8bb61d1ea"}
35540262 ns === 0.035ms

//CREATE - new store
let addNewStore = function (storeData) {

  return Store.create(storeData)
    .then((storeObj) => {
      return storeObj;
    })
    .catch((err) => {
      throw err;
    })
};

//CouchDB Syntax for Update (PUT) ***********************************
$ curl -X GET http://127.0.0.1:5984/stores/1499
//Use revision id _rev from response to update the document.
$ curl -X PUT http://127.0.0.1:5984/stores/1499/-d '{ "item_Price":" 33.00" , "_rev":"1-5585a9c00971d78a751c106805508fbf" }'

$ curl -X GET http://127.0.0.1:5984/stores/1499

//UPDATE - change stores phone number
let updateStoreDetails = function (storeDetails) {

  const filter = { storeName: storeDetails.storeName };
  const update = {
    storeName: storeDetails.storeName,
    storeAddress: storeDetails.storeAddress,
    storePhoneNumber: storeDetails.storePhoneNumber
  };
  return Store.findOneAndUpdate(filter, update, { new: true })
    .then((updatedStore) => {
      return updatedStore;
    })
    .catch((err) => {
      throw err;
    })
};

//CouchDB Syntax for Delete (DELETE)**********************************
curl -X DELETE http://127.0.0.1:5984/stores/01?rev=1-bbc790e06ca784953aa78b4a8748bb6f

//DELETE - remove closing store location
let deleteStore = function (store) {
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