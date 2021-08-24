
const dotenv = require('dotenv')
const fs = require("fs");
dotenv.config()
const read = require("./operations/read");

global.__logger = require('./config/logger');

const writableStream = fs.createWriteStream("output.txt");
const { FILE_NAME } = process.env;

read
  .readFile(FILE_NAME, (chunk) => {
    writableStream.write(chunk);
    __logger.info(chunk)
  })
  .then((data) => __logger.info(data))
  .catch((e) => __logger.error({ e }));
