const BaseHandler = require('./baseHandler');
const fs = require('fs');
const path = require('path');
const { escapehtml } = require('../utils');

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
      return this.sendError(res, 400, 'Missing text query parameter');
    }

    const filePath = path.join(this.dataDir, 'file.txt');
    fs.appendFile(filePath, text + '\n', (err) => {
      if (err) {
        console.error('File write error:', err);
        return this.sendError(res, 500, 'Failed to write file');
      }
      this.sendSuccess(res, '<p style="color: green;">Text appended to file.txt</p>');
    });
  }

  readFile(req, res, parsedUrl, fileName) {
    if (!this.validateMethod(req, res, 'GET')) {
      return;
    }
  
    if (!fileName) {
      return this.sendError(res, 400, 'Missing file name');
    }

    const filePath = path.join(this.dataDir, path.basename(fileName));
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          return this.sendError(res, 404, `404 File ${escapehtml(fileName)} not found`);
        }
        console.error('File read error:', err);
        return this.sendError(res, 500, 'Failed to read file');
      }
      this.sendSuccess(res, data, 'text/plain; charset=UTF-8');
    });
  }
}

module.exports = FileHandler;