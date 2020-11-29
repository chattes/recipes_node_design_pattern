const uniqid = require('uniqid');
const buildMakeRecipes = require('./recipe');
const makeText = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
const Id = {
    makeId: () => uniqid(makeText(10), makeText(10))
}

const sanitizeText = () => {}

const makeRecipe = buildMakeRecipes({Id, sanitizeText})

module.exports = makeRecipe




