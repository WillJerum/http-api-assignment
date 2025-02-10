const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const script = fs.readFileSync(`${__dirname}/../src/script.js`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCss = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getScript = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(script);
  response.end();
};
module.exports.getIndex = getIndex;
module.exports.getCss = getCss;
module.exports.getScript = getScript;
