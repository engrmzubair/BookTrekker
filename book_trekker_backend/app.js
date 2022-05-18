const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const config = require('config');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const productRouter = require('./routes/productRouter');
const { error } = require('./controllers/errorController');
const AppError = require('./utils/appError');

//app
const app = express();
console.log("Environment =>", process.env.NODE_ENV)

if (!config.get('jwtPrivateKey')) {
  throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
}
if (!config.get('cloudinary.cloudName')) {
  throw new Error('FATAL ERROR: cloudName is not defined.');
}
if (!config.get('cloudinary.apiKey')) {
  throw new Error('FATAL ERROR: apiKey is not defined.');
}
if (!config.get('cloudinary.apiSecret')) {
  throw new Error('FATAL ERROR: apiSecret is not defined.');
}
if (!process.env.NODE_ENV) {
  throw new Error('FATAL ERROR: environment is not defined.');
}


//catching uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
  console.log(err)
  console.log(err.message, err.name);
  process.exit(1);
});

//db
mongoose.connect(config.get('db'))
  .then(() => console.log('You are now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong.', err));

// throw new Error('just for testing')

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cookieParser())

//user routes
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/secret', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/product', productRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${ req.originalUrl } on this server.`, 404))
})


//error middleware
app.use(error)
const port = config.get('server.port') || 3000;

app.listen(port, () => {
  console.log(`Server is listening on ${ port }`);
})