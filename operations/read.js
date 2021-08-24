"use strict";
const path = require("path");
const { Storage } = require("@google-cloud/storage");

const { GOOGLE_JSON_PATH, BUCKET_NAME, PROJECT_ID } = process.env;

// create a new storage account
const gc = new Storage({
  keyFilename: path.join(__dirname, GOOGLE_JSON_PATH),
  projectId: PROJECT_ID,
});

/**
 * To read a file from GC and update the encoding of it which return a runtime callback to handle multiple task
 * @param {a fileName from the connected bucket to encode} fileName a filename or file path for the file which needs to be encoded in the connected BUCKET
 * @param {a callback method which will return current chunk executed } callback This callback can be used as parallel processing for the outer methods
 * @param {an encoding for reading the stream. Defaults is base64} encoding Set the encoding for the file. Default value is base64
 * @returns callback and resolve a final encoded file content
 * @example
    readFile((chunk) => {
      // do other processing for chunks
      console.log(chunk)
    })
    .then((data) => {
      // final processing of content
      console.log(data)
    })
    .catch((e) => console.log({ e }));
 */
const readFile = (fileName, callback, encoding = 'base64') => {
  return new Promise(async (resolve, reject) => {
    var archive = gc.bucket(BUCKET_NAME).file(fileName).createReadStream();
    var buf = "";
    archive.setEncoding(encoding);
    archive
      .on("data", function (d) {
        buf += d;
        callback(d)
      })
      .on("end", function () {
        resolve(buf);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};
module.exports = {
  readFile,
};
