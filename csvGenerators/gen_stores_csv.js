const fs = require('fs');

const csvWriter = require('csv-write-stream');
var writer = csvWriter()
const writeItems = fs.createWriteStream('items.csv');
writeItems.write('itemId, itemAvailability\n', 'utf8');

const faker = require('faker/locale/en_US');
//faker.locale = "en_US"

//resources:
//https://nodejs.org/api/stream.html#stream_event_drain
//https://medium.com/@danielburnsart/writing-a-large-amount-of-data-to-a-csv-file-using-nodes-drain-event-99dcaded99b5

//10MM products across 1500 stores

//product id 100 - 10,000,100
//product price: 7fakerPrice, "online only", "out of stock"

//Example:
function writeOneThousandStoresToCSV(writer, encoding, callback) {

  let i = 10000;
  let id = 100;

  function write() {

    let ok = true;

    do {
      i -= 1;
      id += 1;
      //console.log(faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"));
      const store_Name = faker.address.streetName();
      const store_Address = `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()}, ${faker.address.zipCode()}`;
      const store_PhoneNumber = faker.phone.phoneNumberFormat()

      const data = `${id}, ${store_Name}, ${store_Address}, ${store_PhoneNumber}\n`;
      console.log('store data is shaped like so: ', data)

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

writeOneThousandStoresToCSV(writeItems, 'utf-8', () => {
  writeItems.end();
});
