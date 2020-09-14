const morgan = require('morgan');
const app = require('./index.js');
// const connect = require('../database-mongodb/connect.js');
const db = require('../database-postgreSql/index.js');
const PORT = 3006;
app.use(morgan('dev'));

console.log(db.connectToPostgres());

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
