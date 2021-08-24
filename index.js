
const dotenv = require('dotenv')
dotenv.config()
const read = require("./read");
read
  .readFile()
  .then((data) => console.log(data))
  .catch((e) => console.log({ e }));
