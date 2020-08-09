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

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString(); // convert Buffer to string
      });

      req.on('end', () => {
        //resolve(parse(body));
        resolve(body);
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  parser,
  getPostData,
};
