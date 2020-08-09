const {
  bulkInsert,
  readById,
  read,
  destroy,
  update,
  insert,
} = require('../model');
const Db = require('../model/database');
const { Sequelize } = Db;
const { Op } = Sequelize;
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

const rate = async (data, id) => {
  try {
    const ratingData = { ...data, ...{ recipeId: id } };
    await insert('ratings', ratingData);
    return true;
  } catch (error) {
    return false;
  }
};

const search = async (search) => {
  try {
    const { qs } = search;
    const results = await read({
      dbName: 'recipe',
      where: { name: { [Op.like]: `%${qs}%` } },
      limit: 20,
    });
    return results;
  } catch (error) {
    console.log('Error occured while searching');
    return [];
  }
};

module.exports = {
  get,
  get_by_id,
  create,
  updateRecipe,
  purgeRecipe,
  search,
  rate,
};