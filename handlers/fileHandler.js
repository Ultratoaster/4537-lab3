const BaseHandler = require('./baseHandler');
const fs = require('fs');
const path = require('path');
const { escapehtml } = require('../utils');
const messageManager = require('../services/messageManager');

class FileHandler extends BaseHandler {
  constructor() {
    super();
    this.dataDir = path.join(__dirname, '..', 'data');
    this.ensureDataDir();
  }

  ensureDataDir() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  writeFile(req, res, parsedUrl) {
    if (!this.validateMethod(req, res, 'GET')) {
      return;
    }

    const text = parsedUrl.searchParams.get('text');
    if (!text) {
      return this.sendError(res, 400, messageManager.t('ERROR_MISSING_TEXT'));
    }

    const filePath = path.join(this.dataDir, 'file.txt');
    fs.appendFile(filePath, text + '\n', (err) => {
      if (err) {
        console.error('File write error:', err);
        return this.sendError(res, 500, messageManager.t('ERROR_FAILED_WRITE'));
      }
      this.sendSuccess(res, '<p style="color: green;">' + messageManager.t('SUCCESS_TEXT_APPENDED') + '</p>');
    });
  }

  readFile(req, res, parsedUrl, fileName) {
    if (!this.validateMethod(req, res, 'GET')) {
      return;
    }
  
    if (!fileName) {
      return this.sendError(res, 400, userMessages.ERROR_MISSING_FILE_NAME);
    }

    const filePath = path.join(this.dataDir, path.basename(fileName));
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          let errorMessage = messageManager.t('ERROR_FILE_NOT_FOUND', { fileName: escapehtml(fileName) });
          return this.sendError(res, 404, errorMessage);
        }
        console.error('File read error:', err);
        return this.sendError(res, 500, messageManager.t('ERROR_FAILED_READ'));
      }
      this.sendSuccess(res, data, 'text/plain; charset=UTF-8');
    });
  }
}

module.exports = FileHandler;