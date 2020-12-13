const { describe, it, expect } = require('@jest/globals');
const makeRecipe = require('./');
const {makeFakeRecipe} = require("../../__test__/fixtures/recipe")




describe('Recipes', () => {
  it('It should have a category', () => {
    let recipe = makeFakeRecipe({ category: null });
    expect(() => {
      makeRecipe(recipe);
    }).toThrow('Recipe needs a Category');
  });
  it('It should have an author', () => {
    let recipe = makeFakeRecipe({ author: null });
    expect(() => {
      makeRecipe(recipe);
    }).toThrow('Recipe needs an author');
  });
  it('It should make an Id', () => {
    let recipe = makeFakeRecipe({ id: null });
    expect(() => {
      makeRecipe(recipe);
    }).not.toThrow();
  });
  it('It should have ingredients', () => {
    let recipe = makeFakeRecipe({ ingredients: null });
    expect(() => {
      makeRecipe(recipe);
    }).toThrow('Recipe needs some ingredients');
  });
  it('It can be published', () => {
    let unPublishedRecipe = makeFakeRecipe();
    const recipe = makeRecipe(unPublishedRecipe) 
    expect(recipe.getPublished()).toBe(false)
    recipe.publish()
    expect(recipe.getPublished()).toBe(true)
  });
  it('can add tags', () => {
      let initialTaggedRecipe = makeFakeRecipe()
      const recipe = makeRecipe(initialTaggedRecipe)
      expect(recipe.getTags().length).toBe(2)
      recipe.addTags(["sushi", "japanese"])
      expect(recipe.getTags().includes('sushi')).toBe(true)
  })
  it('can change category', () => {
      let initialCategory = makeFakeRecipe()
      const recipe = makeRecipe(initialCategory)
      expect(recipe.getCategory().length).toBeGreaterThan(0)
      recipe.changeCategory("Vegan")
      expect(recipe.getCategory()).toBe("Vegan")
  })
});
