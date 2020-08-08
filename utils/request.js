const url = require('url');
const parser = (req) => {
  const { method } = req;
  const { query } = url.parse(req.url, true);
  let data = null;

  if (method === 'POST' || method === 'PUT') {
  }
  return { method, query, data };
};

const bodyParser = async (req) => {};

module.exports = {
  parser,
};
