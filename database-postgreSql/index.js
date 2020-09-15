const dotenv = require('dotenv').config();
const { Pool, Client } = require('pg');

//using pool given eventual need to use db frequently as scale up db calls

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: 5432,
  database: 'deliverpickup'
});

//error handler for pool. If error, the cb is fired
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// using the pool obj, connect to db and use a client in that pool to execute a query
let connectToPostgres = () => {
  console.log('db index.js connect func called')
  pool.connect(function (error, client, done) {
    if (error) {
      console.log('error getting client: ', error)
    } else {
      let query = 'SELECT NOW() as now'
      client.query(query, function (err, result) {
        done();
        if (err) {
          throw err;
          console.log(err.stack)
        } else {
          console.log('database connected: ', result.rows[0]);
          var rows = result.rows[0];
        }
      })
    }
  });
};

//READ
const findItemInStore = `
  SELECT items.item_price, stores.store_name, stores.store_address, stores.store_phonenumber
  FROM items
  JOIN stores ON items.item_StoreId = stores.store_id
  WHERE items.item_Id = $1;
`;

//CREATE
const createStore = `
  INSERT INTO stores
    (
    store_Name,
    store_Address,
    store_PhoneNumber
    )
    VALUES ($1, $2, $3);
`;

//UPDATE
const updateStore = `
  UPDATE stores
  SET
    store_Name = $1,
    store_Address = $2,
    store_PhoneNumber = $3
  WHERE
    store_Name = $1
  RETURNING *;
`;

//DELETE
const deleteStore = `
  DELETE FROM stores
  WHERE store_Name=$1
`;

module.exports = {
  pool,
  createStore,
  findItemInStore,
  updateStore,
  deleteStore,
  connectToPostgres
}


