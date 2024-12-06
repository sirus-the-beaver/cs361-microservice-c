const axios = require('axios');
const ExcludedRecipes = require('../models/ExcludedRecipes');

exports.getRecipes = async (req, res) => {
    const userId = req.params.userId;

    try {
        const exclusions = await ExcludedRecipes.findOne({ userId });
        const excludedRecipeIds = exclusions ? exclusions.recipeIds : [];
        const preferencesResponse = await axios.get(`https://dishfindr-microservice-b-0d2b598a2033.herokuapp.com/preferences/${userId}`);
        const { dietaryRestrictions, allergies } = preferencesResponse.data;

        const queryParams = {
            apiKey: process.env.SPOONACULAR_API_KEY,
            diet: dietaryRestrictions.join(',') || 'none',
            intolerances: allergies.join(',') || 'none',
        };

        const recipesResponse = await axios.get('https://api.spoonacular.com/recipes/complexSearch', 
        { 
            params: queryParams
        });

        const recipes = recipesResponse.data.results.filter(recipe => !excludedRecipeIds.includes(recipe.id.toString()));

        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch recipes." });
    }
};

exports.excludeRecipe = async (req, res) => {
    const { userId, recipeId } = req.body;

    if (!userId || !recipeId) {
        return res.status(400).json({ error: "Missing required parameters." });
    }

    try {
        const excludedRecipes = await ExcludedRecipes.findOne({ userId });

        if (excludedRecipes) {
            excludedRecipes.recipeIds.push(recipeId);
            await excludedRecipes.save();
        } else {
            await ExcludedRecipes.create({ userId, recipeIds: [recipeId] });
        }

        res.status(200).json({ message: "Recipe excluded." });
    } catch (error) {
        res.status(500).json({ error: "Failed to exclude recipe." });
    }
};

exports.getExcludedRecipes = async (req, res) => {
    const { userId } = req.params;

    try {
        const exclusions = await ExcludedRecipes.findOne({ userId });
        res.status(200).json(exclusions.recipeIds);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch excluded recipes." });
    }
};