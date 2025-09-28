const messageManager = require('../services/messageManager');

class BaseHandler {
  constructor() {
    this.contentType = 'text/html; charset=UTF-8';
  }

  validateMethod(req, res, allowedMethod = 'GET') {
    if (req.method !== allowedMethod.toUpperCase()) {
      res.writeHead(405, { 'Content-Type': this.contentType });
      res.end(`<h1 style="color: red;">${messageManager.t('ERROR_ILLEGAL_METHOD')}</h1>`);
      return false;
    }
    return true;
  }

  sendError(res, statusCode, message) {
    res.writeHead(statusCode, { 'Content-Type': this.contentType });
    res.end(`<p style="color: red;">${message}</p>`);
  }

  sendSuccess(res, message, contentType = this.contentType) {
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(message);
  }

  handle(req, res, parsedUrl) {
    throw new Error('Unimplemented handle method');
  }
}

module.exports = BaseHandler;