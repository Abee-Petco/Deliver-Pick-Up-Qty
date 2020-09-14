 pool:
  BoundPool {
    _events: [Object: null prototype] { error: [Function] },
    _eventsCount: 1,
      _maxListeners: undefined,
        options:
    {
      user: 'lfryett1',
        host: '127.0.0.1',
          port: 5432,
            database: 'deliverpickup',
              max: 10,
                maxUses: Infinity,
                  idleTimeoutMillis: 10000
    },
    log: [Function],
      Client: { [Function: Client] Query: [Function: Query] },
    Promise: [Function: Promise],
      _clients: [],
        _idle: [],
          _pendingQueue: [],
            _endCallback: undefined,
              ending: false,
                ended: false
  },
  createStore:
  '\n  INSERT INTO stores(\n    store_id,\n    store_Name,\n    store_Address,\n    store_PhoneNumber\n    )\n  VALUES (\n    storeData.store_id,\n    storeData.store_Name,\n    storeData.store_Address,\n    storeData.store_PhoneNumber\n  );\n',
    findItemInStore:
  '\n  SELECT items.item_price, stores.store_name, stores.store_address, stores.store_phonenumber FROM items\n  JOIN stores ON items.item_StoreId = stores.store_id\n  WHERE items.item_Id = $1;\n',
    updateStore:
  '\n  UPDATE stores\n  SET\n    store_id = storeData.store_id,\n    store_Name = storeData.store_Name,\n    store_Address = storeData.storeAddress,\n    store_PhoneNumber = storeData.store_PhoneNumber\n    WHERE\n    store_Name = storeData.storeName;\n',
    deleteStore:
  '\n  DELETE FROM stores\n  WHERE store_Name = store.store_Name\n  RETURNING * ;\n',
  connect: [Function: connectToPostgres]
