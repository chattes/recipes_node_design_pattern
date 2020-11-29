function buildMakeRecipes({Id, sanitizeText}){

return function makeRecipes({
    id=Id.makeId(),
    category,
    name,
    author,
    tags,
    createdOn = Date.now(),
    prepTime,
    cookingTime,
    published=false,
    ingredients,
    instructions,
} = {}) {

    if(!category){
        throw new Error("Recipe needs a Category")
    }
    if(!name){
        throw new Error('Recipe needs a name')
    }
    if(!author){
        throw new Error('Recipe needs an author')
    }
    if(!ingredients || !Array.isArray(ingredients)){
        throw new Error('Recipe needs some ingredients')
    }

    if(instructions.length < 1 && published){
        throw new Error("Recipe needs some insturctions before publisihing")
    }

    let sanitizedInstructions = sanitizeText(instructions)

    return Object.freeze({
        getId:() => id,
        getCategory:() => category,
        getName:() => name,
        getAuthor:() => author,
        getTags: () => tags,
        getCreatedOn: () => createdOn,
        getPrepTime: () => prepTime,
        getCookingTime: () => cookingTime,
        getPublished: () => published,
        getIngredients: () => ingredients,
        getInstructions: () => sanitizedInstructions,
        publish: () => {
            published = true
            return this
        },
        draft: () => published = false,
        addTags: newTags => {
            if(!Array.isArray(tags)) throw new Error("Invalid format for tags")
            tags = [...tags, newTags]
        },
        changeCategory: categoryNew => category = categoryNew,
    })

}

}


module.exports = buildMakeRecipes
