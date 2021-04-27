# BS - CHALLENGE

## Purpose

The main functionallity of this small project is to store into an in-memory database (mongodb-memory-server) data received from a customer, the data includes the name of the company that is sending the information and an a valid (including all required fields) csv file .

## Design

A single enpoint ({{url:port}}/) has been created, this enpoint receives the file and the company name, both required. The file should be CSV only and it should include at least all the required fields.

### TOOLS folder

This folder includes the following files

- config.js: This file includes all the required fields which are configurable by changing the `fields` array
- mongoose.js: File that handles the connection to the in memory database
- multer.js: File that handles the uploads to the application.
- validations.js: File that handles all validations before actually saving the values to the database.

### MODELS Folder

This folder was created to include the logic (.service.js files) and schema (.model.js files). The logic exposes methods that allows interactios to the database.

### TESTS Folder

This folder includes dummy files that are being used with the unit tests

### Uploads

This folder includes one single file and this is replaced on every upload using the endpoint.

## How to use it?

- For development mode use `yarn start:dev` or `npm run start:dev`
- For testing use `yarn test` or `npm run test`
- For production mode this can be deployed using either `Docker` or `PM2` depending on the server infrasctructure.
