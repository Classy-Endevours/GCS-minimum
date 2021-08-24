## Introduction
A better way to encode GCS files and expect a callback from it. In this small project, we have created a method which will take the necessary connections and return the callback with each chunk and final content in `then` block

## Implementation

#### Definition
To use the wrapper method you just need 3 parameters. Following is the details for the parameters
- fileName - a filename or file path for the file which needs to be encoded in the connected BUCKET
- callback - This callback can be used as parallel processing for the outer methods
- encoding [optional] - Set the encoding for the file. Default value is base64

#### Environment
This project needs 4 environment variable. Refer `.env.sample`
- GOOGLE_JSON_PATH - put the file in root directory
- BUCKET_NAME
- PROJECT_ID
- FILE_NAME - Customize based on your need

#### Example
You can find the example in the `index.js` of this project. To use the method, first one needs to import it inside the file. 
After importing it,
```

read
  .readFile(FILE_NAME, (chunk) => {
    // do some processing with the chunk
    console.log(chunk)
  })
  .then((data) => {
      // do some processing with the final output
      console.log(data)
  })
  .catch((e) => console.log({ e }));

```

#### Other note
This project uses these dependencies
- @google-cloud/storage - to talk with the storage service
- dotenv is to fetch the env variable
- winston is for maintaining the log
```
"dependencies": {
    "@google-cloud/storage": "^5.13.1",
    "dotenv": "^10.0.0",
    "winston": "^3.3.3"
  }
```

This is a minimum example of how you can use this method in your project