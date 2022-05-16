const fs = require('fs');
const multer = require('multer')

//imports from other local directories
const AppError = require("../../utils/appError");
const { validate } = require('../../models/productModel');
const { Category } = require('../../models/categoryModel');


// ..........validation............
const fieldsValidation = (req, next) => {

  // productData object added to req
  req.productData = req.file && req.body && { ...req.body, photo: req.file.filename };

  // fields validation
  const { error } = validate(req.productData);

  //if error => throw it to global error handler
  if (error) {
    fs.unlinkSync(req.file.path);
    next(new AppError(error.details[ 0 ].message, 400));
  }
}

//category validation
const categoryExists = async (req, next) => {
  try {
    const category = await Category.findOne({ _id: req.productData.category }).exec();

    if (category && category.name) return next()
    fs.unlinkSync(req.file.path);
    return next(new AppError('Category does not exists!', 404))
  } catch (ex) {
    next(ex)
  }
}

//product validation
exports.validation = (req, next) => {

  //fields validation
  fieldsValidation(req, next);

  //category validation
  categoryExists(req, next);
}

//multer storage
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, './public/products')
  },
  filename: function (req, file, cb) {

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = file.mimetype.split('/')[ 1 ];
    cb(null, file.fieldname + '-' + uniqueSuffix + "." + ext)
  }
})

//multer file filter (only images are allowed)
const fileFilter = (req, file, cb) => {

  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new AppError('Only .png, .jpg and .jpeg format allowed!', 400));
  }
}

//file size limit to 1MB
const maxSize = 1 * 1024 * 1024;
const limits = { fileSize: maxSize }

//multer option objects
exports.multerOptions = {
  storage: storage,
  fileFilter,
  limits
}
