const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

 
mongoose
 .connect('mongodb://localhost:27017/restFull',{
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true 
} )
 .then(() => {

  console.log('Connected to the Database successfully');
 });
 mongoose.Promise = global.Promise;


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const categoryRoutes = require('./api/routes/category');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access_Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
if(req.method ==='OPTIONS'){
    res.header('Access-Control-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
}
next();
})

// Routes all reques handle here
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/categories', categoryRoutes);
// error handle


app.use((req, res, next) =>{
    const error = new Error('Not found');
    error.status(404);
    next(error);
})

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports= app;