const { getRecipes } = require('../controllers/recipeController');
const express = require('express');
const router = express.Router();

router.get('/:userId', getRecipes);

module.exports = router;