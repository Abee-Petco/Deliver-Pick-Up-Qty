const { pool } = require('pg');
//using pool given eventual need to use db frequently as scale up db calls

const pool = new Pool({
  user: "lfryett1",
  password: "Jezebel2",
  host: "127.0.0.1",
  port: 5432,
  database: deliverpickup
});

//READ
const findItemInStore = `
  SELECT items.item_price, stores.store_name, stores.store_address, stores.store_phonenumber FROM items
  JOIN stores ON items.item_StoreId = stores.store_id
  WHERE items.item_Id = $1;
`;

//CREATE
const createStore = `
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
`;

//UPDATE
const updateStore = `
  UPDATE stores
  SET
    store_id = storeData.store_id,
    store_Name = storeData.store_Name,
    store_Address = storeData.storeAddress,
    store_PhoneNumber = storeData.store_PhoneNumber
    WHERE
    store_Name = storeData.storeName;
`;

//DELETE
const deleteStore = `
  DELETE FROM stores
  WHERE store_Name = store.store_Name
  RETURNING * ;
`;

module.exports.pool = pool;
module.exports.createStore = createStore;
module.exports.findItemInStore = findItemInStore;
module.exports.updateStore = updateStore;
module.exports.deleteStore = deleteStore;
