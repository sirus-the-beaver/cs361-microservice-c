# Recipe Recommendation Microservice

## Overview
This microservice handles getting recipe recommendations based on user saved preferences, getting a user's excluded recipes, and setting a user's excluded recipes.

## Features
- Getting recipes
- Getting a user's excluded recipes
- Setting a user's excluded recipes

## Tech Stack
- Node.js, Express
- **Database**: MongoDB
- **Communication**: REST API
- **API**: [Spoonacular API](https://spoonacular.com/food-api)
- **Deployment**: Heroku

## API Documentation
### Base URL
```https://dishfindr-microservice-c-ca58d83577d1.herokuapp.com```

### Endpoints
```GET /recipes/:userId```
- **Description**: Gets recipe recommendations purely based on a user's saved dietary restrictions and allergies (not based on inputted ingredients)
- **Query Parameters**:
    - ```userId```: (string) The user's MongoDB ID
- **Response**:
```json
{
    "offset": Number,
    "number": Number,
    "results": [
        {
            "id": Number,
            "title": "String",
            "image": "String",
            "imageType": "String"
        }
    ],
    "totalResults": Number
}
```

```POST /exclude-recipe```
- **Description**: Updates and saves a user's list of excluded recipes that they wish to not have shown in future recommendations.
- **Request Body**:
```json
{
    "userId": "String",
    "recipeId": "String"
}
```

```GET /excluded-recipes/:userId```
- **Description**: Gets a list of recipe IDs of recipes that the user wants excluded from future recommendations.
- **Query Parameters**:
    - ```userId```: (string) The user's MongoDB ID
- **Response**:
```json
{
    ["String"]
}
```
