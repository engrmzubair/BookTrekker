const AppError = require("../utils/appError");

const handleDuplicateErrorDB = err => {
  const message = "Duplicate key error collection!";
  return new AppError(message, 400);
}
const handleUnauthorizedError = err => {
  const message = "Invalid credentials!";
  return new AppError(message, 401);
}
const handleSizeLimitError = err => {
  const message = "File size is larger than 1MB!";
  return new AppError(message, 400);
}

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}


const sendErrorProd = (err, res) => {
  //Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
  }

  //Programming or other unknown error: don't leak error details
  else {
    // 1) Log error
    console.error("Error: ", err);

    //send generic message
    res.status(500).json({
      status: 'error',
      message: 'something went very wrong'
    })
  }
}



exports.error = function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error'; // e.g if status code is 500 range is error or if in 400 range is fail

  if (process.env.NODE_ENV === 'development') {
    // res.send()
    sendErrorDev(err, res);
  }
  else if (process.env.NODE_ENV === 'production') {
    let error;
    if (err.code === 11000) {
      error = handleDuplicateErrorDB(err)
      sendErrorProd(error, res)
    }
    else if
      (err.code === "credentials_required" ||
      err.code === "credentials_bad_format") {
      error = handleUnauthorizedError(err)
      sendErrorProd(error, res)
    }
    else if (err.code === "LIMIT_FILE_SIZE") {
      error = handleSizeLimitError(err);
      sendErrorProd(error, res)
    }

    sendErrorProd(err, res);
  }



}