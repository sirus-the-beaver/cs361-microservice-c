const { getRecipes, excludeRecipe, getExcludedRecipes } = require('../controllers/recipeController');
const express = require('express');
const router = express.Router();

router.get('/recipes/:userId', getRecipes);
router.post('/exclude-recipe', excludeRecipe);
router.get('/excluded-recipes/:userId', getExcludedRecipes);

module.exports = router;