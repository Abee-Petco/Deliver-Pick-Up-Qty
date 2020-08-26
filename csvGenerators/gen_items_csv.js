const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

//fake = Faker([en_US]);
const writeItems = fs.createWriteStream('items.csv');
writeItems.write('itemId, itemAvailability\n', 'utf8');

//resources:
//https://nodejs.org/api/stream.html#stream_event_drain
//https://medium.com/@danielburnsart/writing-a-large-amount-of-data-to-a-csv-file-using-nodes-drain-event-99dcaded99b5

//10MM products across 1500 stores
//product id 100 - 10,000,100

//Example:
function writeTenMillionProductsToCSV(writer, encoding, callback) {

  let i = 105;
  let id = 100; //test small at first to verify data gen'd is usable

  function write() {

    let ok = true;

    do {
      i -= 1;
      id += 1;

      const item_Id = id;
      const item_Availability = Math.random() < 0.7;
      const item_Price = faker.commerce.price(); //product price: 7fakerPrice, "online only", "out of stock"

      const data = `${item_Id},${item_Availability},${item_Price}\n`;
      console.log('items data is shaped like so: ', data);

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
