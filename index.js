const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/recipes/:userId', recipeRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});