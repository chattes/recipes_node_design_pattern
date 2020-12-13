const { describe, expect } = require("@jest/globals");

const makeAddRecipe = require("./add-recipes")
const {makeFakeRecipe} = require("../../__test__/fixtures/recipe")
const makeTestDb = require("../../__test__/fixtures/testDB")
const makeRecipeDb = require("../data-access/recipe-db")
describe('add-recipes', () => {
    it('should be able to add recipes', async () => {
        const makeDBEnitity = makeRecipeDb({makeDB: makeTestDb}) 
        const addRecipe = makeAddRecipe({recipeDB: makeDBEnitity})
        const fakeRecipeAdd = makeFakeRecipe()
        const inserted = await addRecipe({recipeInfo: fakeRecipeAdd})
        expect(inserted).toBe(fakeRecipeAdd)
    })
})
