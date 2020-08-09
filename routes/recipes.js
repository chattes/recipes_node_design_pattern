const { send } = require('../utils/response');
const url = require('url');
const routeMatcher = require('route-matcher').routeMatcher;
const {
  get,
  get_by_id,
  create,
  updateRecipe,
  purgeRecipe,
  rate,
} = require('../controllers/recipes');
var matched = false;

const { parser } = require('../utils/request');
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
  matcher('/recipes', 'GET', async (params, req, sendResponse) => {
    const recipes = await get();
    sendResponse(200, { data: recipes });
  }),
  matcher('/recipes', 'POST', async (params, req, sendResponse) => {
    console.log('Create Recipes ', JSON.parse(params.data));
    let recipeData = JSON.parse(params.data);
    if (!Array.isArray(recipeData)) {
      recipeData = [recipeData];
    }
    const created = await create(recipeData);
    if (created)
      return sendResponse(200, { data: 'Created Succesfully' });
    sendResponse(400, { data: 'Error Creating Recipes' });
  }),
  matcher(
    '/recipes/:id',
    'GET',
    async (params, req, sendResponse) => {
      const recipe = await get_by_id(params.id);
      return sendResponse(200, { data: recipe });
    },
  ),
  matcher(
    '/recipes/:id',
    'PUT',
    async (params, req, sendResponse) => {
      let updated = await updateRecipe(
        JSON.parse(params.data),
        params.id,
      );
      if (updated) return sendResponse(200, { data: 'success' });
      return sendResponse(400, { error: 'Cannot update Recipe' });
    },
  ),
  matcher(
    '/recipes/:id',
    'PATCH',
    async (params, req, sendResponse) => {
      let updated = await updateRecipe(
        JSON.parse(params.data),
        params.id,
      );
      if (updated) return sendResponse(200, { data: 'success' });
      return sendResponse(400, { error: 'Cannot update Recipe' });
    },
  ),
  matcher(
    '/recipes/:id',
    'DELETE',
    async (params, req, sendResponse) => {
      let deleted = await purgeRecipe(params.id);
      if (deleted) return sendResponse(200, { data: 'success' });
      sendResponse(400, { error: 'Unable to Delete Recipe' });
    },
  ),
  matcher(
    '/recipes/:id/rating',
    'POST',
    async (params, req, sendResponse) => {
      let { id, data } = params;
      data = JSON.parse(data);
      let success = await rate(data, id);
      if (success) return sendResponse(200, { data: 'success' });
      sendResponse(400, { error: 'Unable to rate' });
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
