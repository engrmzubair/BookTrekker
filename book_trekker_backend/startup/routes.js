const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('../routes/authRouter');
const userRouter = require('../routes/userRouter');
const categoryRouter = require('../routes/categoryRouter');
const productRouter = require('../routes/productRouter');
const { error } = require('../controllers/errorController');
const AppError = require('../utils/appError');


module.exports = (app) => {

  //middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(cors())

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

}