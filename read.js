"use strict";
const path = require("path");
const fs = require("fs");
const { Storage } = require("@google-cloud/storage");

const { GOOGLE_JSON_PATH, BUCKET_NAME, PROJECT_ID, FILE_NAME } = process.env;

const gc = new Storage({
  keyFilename: path.join(__dirname, GOOGLE_JSON_PATH),
  projectId: PROJECT_ID,
});
const readFile = (encoding = 'base64') => {
  return new Promise(async (resolve, reject) => {
    var writableStream = fs.createWriteStream("output.txt");
    var archive = gc.bucket(BUCKET_NAME).file(FILE_NAME).createReadStream();
    var buf = "";
    archive.setEncoding(encoding);

    archive
      .on("data", function (d) {
        writableStream.write(d);
        buf += d;
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
