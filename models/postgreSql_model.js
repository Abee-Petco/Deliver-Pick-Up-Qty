//POSTGRES Syntax for Read (GET) using itemId
SELECT
  *
FROM
   items
WHERE
  item_Id = itemId; //is it single ='s for equal to in postgres?

//would have to pass value of items.item_StoreId to next query
SELECT
  *     //return all storeIds
FROM
  stores
WHERE
  item.item_StoreId = store_id  //does a query have access to both tables as long as you're in the same db?

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

//POSTGRES Syntax for Create (POST)
INSERT INTO stores(
  store_id,
  store_Name,
  store_Address,
  store_PhoneNumber
  )
VALUES (
  storeData.store_id,
  storeData.store_Name,
  storeData.store_Address,
  storeData.store_PhoneNumber
);

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

//POSTGRES Syntax for Update (PUT)

UPDATE stores
SET
  store_id = storeData.store_id,
  store_Name = storeData.store_Name,
  store_Address = storeData.storeAddress,
  store_PhoneNumber = storeData.store_PhoneNumber
WHERE
  storeName = storeData.storeName;


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

module.exports = {
  findAnItemAvailAndStore,
  addNewStore,
  updateStoreDetails,
  deleteStore
}