const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cache = require('memory-cache');

const {
  findAnItemAvailAndStore,
  addNewStore,
  updateStoreDetails,
  deleteClosingStore,
} = require('../models/postgreSql_model.js')

const cors = require('cors');
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Type', 'application/javascript');
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(express.static(__dirname + '/../react-client/dist'));

/*---------CACHE----------------*/

let memCache = new cache.Cache();
let cacheMiddleware = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cacheContent = memCache.get(key);
    if (cacheContent) {
      res.send(cacheContent);
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        memCache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next()
    }
  }
}

/*-----CRUD SERVER ROUTES--------*/

//READ - get item in avail stores
app.get('/availableAt/:itemId/', cacheMiddleware(30), function (req, res) {
  let itemId = req.params.itemId;
  return findAnItemAvailAndStore(itemId)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    })
})

//CREATE - new store
app.post('/newStore/', function (req, res) {
  let storeData = req.body;
  return addNewStore(storeData)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
});

//UPDATE - change store data
app.put('/updateStoreDetails/', function (req, res) {
  let storeData = req.body;
  return updateStoreDetails(storeData)
    .then((data) => {
      res.status(201).send('server: store record updated');
    })
    .catch((err) => {
      res.status(500).send(err);
    })
});

//DELETE - remove closing store location
app.delete('/deleteStore/', function (req, res) {
  let storeName = req.body.store_name;
  return deleteClosingStore(storeName)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})

app.get('/:product_id', (req, res) => {
  res.sendFile(path.resolve('react-client/dist/index.html'));
});

module.exports = app



