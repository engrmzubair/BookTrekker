
exports.error = function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error'; // e.g if status code is 500 range is error or if in 400 range is fail.

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
}