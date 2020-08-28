const fs = require('fs');

const csvWriter = require('csv-write-stream');
var writer = csvWriter()
const writeItems = fs.createWriteStream('items.csv');

writeItems.write('item_Id |  item_StoreId | item_Availability | item_Price\n', 'utf8');

const faker = require('faker');

//resources:
//https://nodejs.org/api/stream.html#stream_event_drain
//https://medium.com/@danielburnsart/writing-a-large-amount-of-data-to-a-csv-file-using-nodes-drain-event-99dcaded99b5

//10MM products across 1500 stores
//product id 100 - 10,000,100

console.time("data generation test");

//Example:
function writeTenMillionProductsToCSV(writer, encoding, callback) {

  let i = 10000001;
  let id = 99;

  function write() {

    let ok = true;

    do {
      i -= 1;
      id += 1;
      const delimiter = '|'

      const item_Id = id;
      const item_Availability = faker.random.boolean();  //Math.random() < 0.7
      const item_Price = faker.commerce.price(1,300);
      const item_StoreId = faker.random.number({
        'min': 1,
        'max': 1500
      });

      const data = `${item_Id} ${delimiter} ${item_StoreId} ${delimiter} ${item_Availability} ${delimiter} ${item_Price}\n`;

      if (i === 100) {
        writer.write(data, encoding, callback);

      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }

    } while (i > 100 && ok);

    if (i > 100) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write()
}
// pauses the write process when the buffer is full and once the drain event if fired, it continues until all the records have been written.

writeTenMillionProductsToCSV(writeItems, 'utf-8', () => {
  writeItems.end();
});

console.timeEnd("data generation test");