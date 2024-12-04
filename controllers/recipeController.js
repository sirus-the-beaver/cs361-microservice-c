const axios = require('axios');

exports.getRecipes = async (req, res) => {
    const { userId } = req.params;

    try {
        const preferencesResponse = await axios.get(`http://localhost:5007/preferences/${userId}`);
        const { dietaryRestrictions, allergies } = preferencesResponse.data;

        const queryParams = {
            apiKey: process.env.SPOONACULAR_API_KEY,
            diet: dietaryRestrictions.join(',') || 'none',
            intolerances: allergies.join(',') || 'none',
        };

        const recipesResponse = await axios.get('https://api.spoonacular.com/recipes/complexSearch', { params: queryParams });

        const recipes = recipesResponse.data.recipes;
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch recipes." });
    }
};