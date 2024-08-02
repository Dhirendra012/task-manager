const connectDB = require('./db/connect');
const express = require('express');
const app = express();
const notFound = require('./middle_ware/not-found');
const errorHandleMW = require('./middle_ware/error-handler')
require('dotenv').config();

app.use(express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/api/v1/tasks')        - Get all the tasks
// app.post('/api/v1/tasks')       - Create a new tasks
// app.get('/api/v1/tasks/:id')        - Get simgle task
// app.patch('/api/v1/tasks/:id')       - Create task
// app.delete('/api/v1/tasks/:id')        - Delete task

const task = require('./routes/tasks');

app.use('/api/v1/tasks', task);
app.use(notFound);
app.use(errorHandleMW);

const start = async () => {
    try 
    {
        await connectDB(process.env.MONGO_URL);
        app.listen(3000 , console.log(`Server is Listening on Port on 3000`));
    }
    catch(error)
    {
        console.log(error);
    }
}

start();
