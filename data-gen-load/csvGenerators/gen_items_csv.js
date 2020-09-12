const fs = require('fs');

const csvWriter = require('csv-write-stream');
var writer = csvWriter()
const writeItems = fs.createWriteStream('items99.csv');

writeItems.write('item_Id |  item_StoreId | item_Availability | item_Price\n', 'utf8');

const faker = require('faker');

console.time("data generation test");

function writeTenMillionProductsToCSV(writer, encoding, callback) {

  let i = 10000101;
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
        ok = writer.write(data, encoding);
      }

    } while (i > 100 && ok);

    if (i > 100) {
      writer.once('drain', write);
    }
  }
  write()
}

writeTenMillionProductsToCSV(writeItems, 'utf-8', () => {
  writeItems.end();
});

console.timeEnd("data generation test");