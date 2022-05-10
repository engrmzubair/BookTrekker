const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const config = require('config');
const userRouter = require('./routes/userRouter');
const { error } = require('./controllers/errorController');
const AppError = require('./utils/appError');

//app
const app = express();

console.log(app.get('env'))

//catching uncaught exceptions
process.on('uncaughtException', ex => {
  console.log('WE GOT AN UNCAUGHT EXCEPTION', ex)
})

//db
mongoose.connect(config.get('db'))
  .then(() => console.log('You are now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong.', err));


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cookieParser())

//user routes
app.use('/api/users', userRouter)

app.all('*', (req, res, next) => {

  next(new AppError(`Can't find ${ req.originalUrl } on this server.`, 404))
})

//error middleware
app.use(error)
const port = config.get('server.port') || 3000;

app.listen(port, () => {
  console.log(`Server is listening on ${ port }`);
})