const makeRecipe = require('../recipes')
const makeAddRecipe = ({recipeDB}) => {
    const addRecipe = ({recipeInfo}) => {
        let recipeAdd = makeRecipe(recipeInfo)
        return recipeDB.insert(recipeAdd)
    }
    return addRecipe
}

module.exports = makeAddRecipe