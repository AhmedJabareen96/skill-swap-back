const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT ;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true
    // useCreateIndex: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully!");
});

app.use(cors(
    {
        origin: 'http://localhost:3000' // Replace with your frontend's origin
    }
));
app.use(bodyParser.json());

// use routes
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
});


