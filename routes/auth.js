const { send } = require('../utils/response');
const url = require('url');
const routeMatcher = require('route-matcher').routeMatcher;
var matched = false;

const USER = 'JOBGET';

const matcher = (url, verb, callback) => ({ req, sendResponse }) => {
  if (routeMatcher(url).parse(req.url) && verb === req.method) {
    const params = routeMatcher(url).parse(req.url);
    matched = true;
    callback(params, req, sendResponse);
  }
};
const all_routes = [
  matcher(
    '/generateToken',
    'POST',
    async (params, req, sendResponse) => {
      console.log('Generate Token');
    },
  ),
];
const handler = async (req, res) => {
  const sendResponse = send(res);
  all_routes.forEach((route_matcher) =>
    route_matcher({ req, sendResponse }),
  );
  if (!matched) {
    sendResponse(400, { data: 'Invalid Method or Route' });
  } else {
    sendResponse(200, { data: 'Route Matched' });
  }
  matched = false;
};

module.exports = handler;
