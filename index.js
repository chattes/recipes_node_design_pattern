const http = require('http');
const glob = require('glob');
const { send } = require('./utils/response');
const models = require('./model');

let module_dict = {};
// create a server object:
glob.sync('./routes/**/*.js').forEach((file) => {
  let dash = file.split('/');
  if (dash.length == 3) {
    let dot = dash[2].split('.');
    if (dot.length == 2) {
      let key = dot[0];
      module_dict[key] = require(file);
    }
  }
});
http
  .createServer(async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    request_handler(req, res);
  })
  .listen(3000, async function () {
    console.log('server has start at port 3000'); // the server object listens on port 3000
    await models.createModels();
  });

const request_handler = async (req, res) => {
  const sendResponse = send(res);
  if (req.url === '/') {
    sendResponse(200, { data: 'welcome to JobGet' });
  }

  const handler = module_dict[req.url.split('/')[1]];
  if (!handler) {
    sendResponse(500, { error: 'Invalid Route' });
    return;
  }
  handler(req, res);
};
