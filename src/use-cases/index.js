const makeAddRecipe = require("./add-recipes")
const recipeDB = require("../data-access")

const addRecipe = makeAddRecipe({recipeDB})

module.exports = Object.freeze({
    addRecipe
})




