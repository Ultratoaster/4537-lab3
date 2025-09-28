const BaseHandler = require('./baseHandler');
const { getDate, escapehtml } = require('../utils');
const messageManager = require('../services/messageManager');

class DateHandler extends BaseHandler {
  handle(req, res, parsedUrl) {
    if (!this.validateMethod(req, res, 'GET')) {
      return;
    }

    const name = parsedUrl.searchParams.get('name');
    if (!name) {
      return this.sendError(res, 400, messageManager.t('ERROR_NO_NAME'));
    }

    const currentDate = getDate();
    const message = messageManager.t('GREETING', {
      name: escapehtml(name),
      date: escapehtml(currentDate),
      time: escapehtml(new Date().toLocaleTimeString())
    });

    this.sendSuccess(res, `<p style="color: blue;">${message}</p>`);
  }
}

module.exports = DateHandler;