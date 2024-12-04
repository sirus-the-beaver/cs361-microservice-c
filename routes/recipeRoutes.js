const { getRecipes } = require('../controllers/recipeController');
const express = require('express');
const router = express.Router();

router.get(getRecipes);

module.exports = router;