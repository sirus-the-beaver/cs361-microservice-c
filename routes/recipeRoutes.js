const { getRecipes } = require('../controllers/recipeController');
const express = require('express');
const router = express.Router();

router.get('/recipes/:userId', getRecipes);

module.exports = router;