const buildMakeRecipes = require('./recipe');
const Id = require("../Id")

const sanitizeText = () => {}

const makeRecipe = buildMakeRecipes({Id, sanitizeText})

module.exports = makeRecipe




