const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
require('dotenv').config()


//Middleware
app.use(express.json());

//Routes
app.use('/api/v1/tasks', tasks);
app.use(notFound);

//Port
const port = process.env.port || 3000;
const start = async () => {
try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening to ${port}...`));
} catch (error) {
    console.log(error);
}
}

start();