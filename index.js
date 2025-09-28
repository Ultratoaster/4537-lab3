// Lab 3 API - Object-Oriented Design
// Author: Ben Henry

const HttpServer = require('./httpServer');
const DateHandler = require('./handlers/dateHandler');
const FileHandler = require('./handlers/fileHandler');

const PORT = process.env.PORT || 3000;

const server = new HttpServer(PORT);

const dateHandler = new DateHandler();
const fileHandler = new FileHandler();

server.addRoute('GET', '/labs/3/getDate', (req, res, parsedUrl) => {
    dateHandler.handle(req, res, parsedUrl);
});

server.addRoute('GET', '/labs/3/writeFile', (req, res, parsedUrl) => {
    fileHandler.writeFile(req, res, parsedUrl);
});

server.addRoute('GET', '/labs/3/readFile', (req, res, parsedUrl, fileName) => {
    fileHandler.readFile(req, res, parsedUrl, fileName);
});

server.start();