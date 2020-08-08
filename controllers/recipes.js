const {
  bulkInsert,
  readById,
  read,
  destroy,
  update,
} = require('../model');
const get = async () => {
  return await read({ dbName: 'recipe' });
};

const get_by_id = async (id) => {
  let data = await read({ dbName: 'recipe', where: { id } });
  return data;
};

const create = async (data) => {
  try {
    await bulkInsert({ dbName: 'recipe', data });
    return true;
  } catch (error) {
    return false;
  }
};

const updateRecipe = async (data, id) => {
  try {
    await update({ dbName: 'recipe', data, where: { id } });
    return true;
  } catch (error) {
    return false;
  }
};

const purgeRecipe = async (id) => {
  try {
    await destroy({ dbName: 'recipe', where: { id } });
    return true;
  } catch (error) {
    return false;
  }
};

const search = async (search) => {};

module.exports = {
  get,
  get_by_id,
  create,
  updateRecipe,
  purgeRecipe,
  search,
};
