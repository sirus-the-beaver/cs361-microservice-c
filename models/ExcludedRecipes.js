const mongoose = require('mongoose');

const excludedRecipeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    recipeIds: {
        type: [Number],
        default: []
    },
});

module.exports = mongoose.model('ExcludedRecipes', excludedRecipeSchema);