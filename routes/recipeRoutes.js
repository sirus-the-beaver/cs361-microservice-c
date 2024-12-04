const { getRecipes } = require('../controllers/recipeController');
const { excludeRecipe } = require('../controllers/recipeController');
const express = require('express');
const router = express.Router();

router.get('/recipes/:userId', getRecipes);
router.post('/exclude-recipe', excludeRecipe);

module.exports = router;