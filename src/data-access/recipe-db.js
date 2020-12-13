const Id = require("../Id");

const makeRecipeDB = ({ makeDB }) => {
  const findById = () => {};
  const findByCategory = () => {};
  const findByTags = () => {};
  const findAll = () => {};
  const insert = async ({id:_id = Id.makeId(), recipeInfo}) => {
    const db = await makeDB() 
    const inserted = await db.collection('recipe').insertOne({_id: id, ...recipeInfo})
    return recipeInfo
  };
  const edit = () => {};
  const remove = () => {};
  return {
      findById,
      findByCategory,
      findByTags,
      findAll,
      insert,
      edit,
      remove
  }
};

module.exports = makeRecipeDB;
