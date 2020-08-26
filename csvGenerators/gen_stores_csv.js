const fs = require('fs');

const csvWriter = require('csv-write-stream');
var writer = csvWriter()
const writeStores = fs.createWriteStream('stores.csv');

writeStores.write('store_Id | store_Name | store_Address | store_PhoneNumber\n', 'utf8');

const faker = require('faker/locale/en_US');

//resources:
//https://nodejs.org/api/stream.html#stream_event_drain
//https://medium.com/@danielburnsart/writing-a-large-amount-of-data-to-a-csv-file-using-nodes-drain-event-99dcaded99b5

//10MM products across 1500 stores

//Example:
function writeOneThousandStoresToCSV(writer, encoding, callback) {

  let i = 1501;
  let id = 0;
  const delimiter = '|'

  function write() {

    let ok = true;

    do {
      i -= 1;
      id += 1;

      const store_Name = faker.address.streetName();
      const store_Address = `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()}, ${faker.address.zipCode()}`;
      const store_PhoneNumber = faker.phone.phoneNumberFormat()

      const data = `${id} ${delimiter} ${store_Name} ${delimiter} ${store_Address} ${delimiter} ${store_PhoneNumber}\n`;

      if (i === 1) {
        writer.write(data, encoding, callback);

      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }

    } while (i > 1 && ok);

    if (i > 1) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write()
}
// pauses the write process when the buffer is full and once the drain event if fired, it continues until all the records have been written.

writeOneThousandStoresToCSV(writeStores, 'utf-8', () => {
  writeStores.end();
});

