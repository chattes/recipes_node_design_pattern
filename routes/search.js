const { send } = require('../utils/response');
const { parser } = require('../utils/request');
const { search } = require('../controllers/recipes');
const handler = async (req, res) => {
  const sendResponse = send(res);
  let {
    query: { entity, qs },
  } = parser(req);
  try {
    switch (entity) {
      case 'recipe':
        let results = await search({ qs });
        sendResponse(200, { data: results });
        break;

      default:
        sendResponse(200, { data: [] });
        break;
    }
  } catch (error) {
    sendResponse(400, { error: 'Error while querying' });
  }
};

module.exports = handler;
