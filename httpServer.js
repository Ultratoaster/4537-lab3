const http = require('http');

class HttpServer {
    constructor(port = 3000) {
        this.port = port;
        this.routes = new Map();
        this.server = null;
    }

    addRoute(method, path, handler) {
        const key = `${method.toUpperCase()}:${path}`;
        this.routes.set(key, handler);
    }

    findRoute(method, path) {
        const key = `${method.toUpperCase()}:${path}`;
        return this.routes.get(key) || null;
    }

    handleRequest(req, res) {
        try {
            const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
            const pathname = parsedUrl.pathname;

            let handler = this.findRoute(req.method, pathname);

            if (handler) {
                return handler(req, res, parsedUrl);
            }

            if (req.method === `GET` && pathname.startsWith('/labs/3/readFile/')) {
                const fileName = pathname.substring('/labs/3/readFile/'.length);
                if (fileName) {
                    const fileHandler = this.findRoute('GET', '/labs/3/readFile');
                    if (fileHandler) {
                        return fileHandler(req, res, parsedUrl, fileName);
                    }
                }
            }

           

            res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
            res.end('<h1>404 Not Found</h1>');
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/html; charset=UTF-8' });
            res.end('<h1 style="color: red;">500 Internal Server Error</h1>');
        }
    }

    start() {
        this.server = http.createServer((req, res) => this.handleRequest(req, res));
        this.server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
        return this;
    }

    stop() {
        if (this.server) {
            this.server.close(() => {
                console.log('Server stopped');
            });
        }
    }
}

module.exports = HttpServer;