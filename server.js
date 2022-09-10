/* eslint-disable n/no-deprecated-api */
const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const httpsOptions = {
  key: fs.readFileSync('./localhost.key'),
  cert: fs.readFileSync('./localhost.crt'),
};
const PORT = 3000;

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Server started on https://localhost:${PORT}`);
  });
});
