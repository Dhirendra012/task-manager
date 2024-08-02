const mongoose = require('mongoose');

// const connectionString = 'mongodb+srv://Dhiru:NodeExpress@nodeexpressproject.yzkqxro.mongodb.net/?retryWrites=true&w=majority&appName=NodeExpressProject'
// const connectionString = 'mongodb+srv://Dhiru:NodeExpress@nodeexpressproject.yzkqxro.mongodb.net/?retryWrites=true&w=majority&appName=NodeExpressProject';

const connectDB = (url) => {
    return mongoose.connect(url , 
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
}

module.exports = connectDB;
