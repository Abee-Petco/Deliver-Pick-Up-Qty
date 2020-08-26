const {Store, ItemAvailability} = require('./itemAvailability.js');

let storeData = [
  {
    storeName: 'N Walnut Creek',
    storeAddress: '2820 Ygnacio Valley Rd Walnut Creek, CA 94598',
    storePhoneNumber: '925-433-4194'
  },
  {
    storeName: 'Walnut Creek',
    storeAddress: '1301 S. California Blvd Walnut Creek, CA 94596-5124',
    storePhoneNumber: '925-988-9370'
  },
  {
    storeName: 'Concord',
    storeAddress: '1150 Concord Ave Suite 160 Concord, CA 94520',
    storePhoneNumber: '925-356-0217'
  },
  {
    storeName: 'Martinez',
    storeAddress: '1170 Arnold Drive No. 115 Martinez, CA 94553',
    storePhoneNumber: '925-370-6060'
  },
  {
    storeName: 'San Ramon',
    storeAddress: '2005 Crow Canyon PI San Ramon, CA 94583-1361',
    storePhoneNumber: '925-275-2111'
  }
]

let insertStoreData = () => {
  return Store.insertMany(storeData)
}

const generateRecords = () => {
  //1 creates the stores
  return insertStoreData()
    .then(() => {
      //then return all store db generated unique id's
      return Store.find({}).select('_id')
    })
    //all of the newly created stores are returned
    .then((stores) => {
      console.log('StoreData', storesIds)
      let itemData = [];
      //then iterated over each of the 100 items
      for (let i = 100; i < 200; i++) {
        //for every store
        let itemAvailability = stores.map((store) => {
          //set the storeId to the value of unique store id. set availabilility of item randomly to true or false
          return {storeId: store._id, availability: Math.random() < 0.7}    //results in 30% false availability, 70% true for each product across
        })
        //created an item record (100 - 199) and ItemAvail as properties and pushed to array
        itemData.push({itemId: i.toString(), itemAvailability});
      }
      console.log('Array of data objects/rows: ', itemData);
      return itemData;
    })
}

let insertRecords = () => {
  return generateRecords() //returns 100 - 199 itemIds distributed across 5 stores
    .then((data) => {
      console.log('Data', data[0])
      //inserts itemId (product data) into the table
      return ItemAvailability.insertMany(data)
        .then(() => {
          console.log('Successfully inserted records')
        })
    })
}



module.exports = insertRecords;
