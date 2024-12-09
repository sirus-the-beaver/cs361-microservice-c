const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const recipeRoutes = require('./routes/recipeRoutes');
const mongoose = require('mongoose');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

dotenv.config();

const allowedOrigins = ['https://dishfindr-4d3c3b6f3b94.herokuapp.com/', 'https://dishfindr-microservice-b-0d2b598a2033.herokuapp.com/'];
app.use(cors(
    {
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const message = 'The CORS policy for this site does not allow access from the specified Origin.';
                return callback(new Error(message), false);
            }
            return callback(null, true);
        }
    }
));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.log(error));

app.use(authMiddleware);
app.use(recipeRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});