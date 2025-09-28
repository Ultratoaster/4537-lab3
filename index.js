// Lab 3 API
// Author: Ben Henry

const http = require('http');
const { getDate, escapehtml } = require ('./utils');
const messages = require ('./lang/messages/en/user');

const PORT = process.env.PORT || 3000;



const server = http.createServer((req, res) => {
  try {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;
    const headContentType = 'text/html; charset=UTF-8';

    if (pathname === '/labs/3/getDate') {
      if (req.method !== 'GET') {
            res.writeHead(405, { 'Content-Type': headContentType });
            return res.end('<h1 style="color: red;">405 Method Not Allowed</h1>');
        }

        const name = parsedUrl.searchParams.get('name');
        if (!name) {
            res.writeHead(400, { 'Content-Type': headContentType });
            return res.end(`<p style="color: red;">${messages.ERROR_NO_NAME}</p>`);
        }

        const currentDate = getDate();

        const message = messages.GREETING
        .replace('{name}', escapehtml(name))
        .replace('{date}', escapehtml(currentDate))
        .replace('{time}', escapehtml(new Date().toLocaleTimeString()));

        res.writeHead(200, { 'Content-Type': headContentType });
        res.end(`<p style="color: blue;">${message}</p>`);
    } else {
        res.writeHead(404, { 'Content-Type': headContentType });
        res.end('<h1>404 Not Found</h1>');
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': headContentType });
    res.end('<h1 style="color: red;">500 Internal Server Error</h1>');
  }
});


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
