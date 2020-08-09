const { send } = require('../utils/response');
const url = require('url');
const routeMatcher = require('route-matcher').routeMatcher;
const { getPostData } = require('../utils/request');
const jwt = require('jsonwebtoken');
const { debug } = require('console');
var matched = false;

const USER = 'JOBGET';

const matcher = (url, verb, callback) => async ({
  req,
  sendResponse,
}) => {
  if (routeMatcher(url).parse(req.url) && verb === req.method) {
    const params = routeMatcher(url).parse(req.url);
    matched = true;
    if (verb === 'POST' || verb === 'PUT' || verb === 'PATCH') {
      const data = await getPostData(req);
      params.data = data;
    }
    callback(params, req, sendResponse);
  }
};
const all_routes = [
  matcher(
    '/auth/token',
    'POST',
    async (params, req, sendResponse) => {
      const { data } = params;
      const { user } = JSON.parse(data);
      if (user === USER) {
        const token = jwt.sign({ _user: user }, 'secret', {
          expiresIn: '10m',
        });

        return sendResponse(200, { token });
      }

      return sendResponse(401, { data: 'Unauthorized' });
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
  }
  matched = false;
};

module.exports = handler;
