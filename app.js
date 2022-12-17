const express = require('express');
const app = express();
const books = require('./routes/bookstore');
const connectDB = require('./db/connect');
const notFound = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/error-handler');
require('dotenv').config();


// Middlewares
app.use(express.json());

// Routes
app.use('/api/bookstore', books);
app.use(notFound);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () =>  console.log(`Server listening at port: ${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

start();