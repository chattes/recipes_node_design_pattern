const { describe, it, expect } = require('@jest/globals');
const makeRecipe = require('./');
const uniqid = require('uniqid');
const faker = require('faker');
const makeText = (length) => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * charactersLength),
    );
  }
  return result;
};
const Id = {
  makeId: () => uniqid(makeText(10), makeText(10)),
};
const sanitizeText = (text) => text;

const makeFakeRecipe = (overrides) => {
  const fakeRecipe = {
    id: Id.makeId(),
    category: faker.random.word(),
    name: faker.random.words(2),
    author: faker.name.firstName(),
    tags: [faker.random.word(), faker.random.word()],
    createdOn: Date.now(),
    prepTime: faker.random.number(60),
    cookingTime: faker.random.number(30),
    published: false,
    ingredients: [faker.random.word(), faker.random.word()],
    instructions: faker.random.words(100),
  };

  return { ...fakeRecipe, ...overrides };
};

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
});
