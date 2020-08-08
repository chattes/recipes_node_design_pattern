const Db = require('./database');
const { sequelize, Sequelize } = Db;
const { DataTypes } = Sequelize;

const Recipe = sequelize.define(
  'recipe',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preptime: { type: DataTypes.INTEGER, allowNull: false },
    difficulty: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      min: 1,
      max: 3,
      allowNull: false,
    },
    vegeterian: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['name'],
      },
    ],
  },
);

const Rating = sequelize.define('rating', {
  rating: { type: DataTypes.INTEGER, min: 1, max: 5 },
});
Recipe.hasMany(Rating);

const createModels = async () => {
  await sequelize.authenticate();
  console.log('>>>>>>>Database Connected<<<<<<<<<<');
  console.log('>>>>>>>Create Tables<<<<<<<<<<');
  await Recipe.sync();
  console.log('>>>>>>>Table Recipe Created<<<<<<<');
  await Rating.sync();
  console.log('>>>>>>>Table Rating Created<<<<<<<');
};

const insert = async (dbname, data, defaults = {}) => {
  switch (dbname) {
    case 'recipe':
      const [recipe, created] = await Recipe.findOrCreate({
        where: data,
        defaults,
      });

      if (recipe) {
        const RecipeObj = recipe.get({
          plain: true,
        });

        return {
          ...RecipeObj,
          created: created,
        };
      } else {
        throw new Error('Error creating Recipes');
      }
    case 'ratings':
      await Rating.create(data);
      break;
    default:
      throw new Error('Database not found');
  }
};

const update = async ({ dbName, data, where }) => {
  switch (dbName) {
    case 'recipe':
      await Recipe.update(data, { where });
      break;
    default:
      throw new Error('Database not found');
  }
};

const destroy = async ({ dbName, where, truncate = false }) => {
  switch (dbName) {
    case 'recipe':
      (await where)
        ? Recipe.destroy({ force: true, where })
        : Recipe.destroy({ force: true, truncate: true });
      break;
  }
};

const bulkInsert = async ({ dbName, data }) => {
  if (data.length === 0)
    throw new Error('No Data passed for Creation');
  switch (dbName) {
    case 'recipe':
      await Recipe.bulkCreate(data);
      break;
  }
};

const read = async ({
  dbName,
  where,
  attributes,
  order,
  limit,
  offset,
  group,
}) => {
  try {
    switch (dbName) {
      case 'recipe':
        const queryResults = await Recipe.findAll({
          attributes,
          where,
        });
        return queryResults;
    }
  } catch (error) {
    return [];
  }
};

const readById = async ({ dbName, id }) => {
  switch (dbName) {
    case 'recipe':
      return await Recipe.findById(id);
  }
};

const rawquery = async (query) => await sequelize.query(query);

module.exports = {
  createModels,
  insert,
  update,
  rawquery,
  destroy,
  bulkInsert,
  read,
  readById,
};
