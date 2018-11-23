const express = require('express');
const morgan = require("morgan");
const cors = require('cors');
const path = require("path");
const app = express();

const { mongoose } = require('./database');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
//app.use(cors({ origin: 'http://localhost:4200' }));

// Routes
app.use('/api/products', require('./routes/products.routes'));


//static files
app.use(express.static(path.join(__dirname, "../client/dist/client")));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});