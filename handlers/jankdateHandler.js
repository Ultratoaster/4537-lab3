const BaseHandler = require('./jankbaseHandler');
const { getDate, escapehtml } = require('../utils');
const messages = require('../lang/messages/en/user');

class DateHandler extends BaseHandler {
  handle(req, res, parsedUrl) {
    if (!this.validateMethod(req, res, 'GET')) {
      return;
    }

    const name = parsedUrl.searchParams.get('name');
    if (!name) {
      return this.sendError(res, 400, messages.ERROR_NO_NAME);
    }

    const currentDate = getDate();
    const message = messages.GREETING
      .replace('{name}', escapehtml(name))
      .replace('{date}', escapehtml(currentDate))
      .replace('{time}', escapehtml(new Date().toLocaleTimeString()));

    this.sendSuccess(res, `<p style="color: blue;">${message}</p>`);
  }
}

module.exports = DateHandler;