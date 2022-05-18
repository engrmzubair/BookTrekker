const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const config = require('config');

//imports from other local directories
const AppError = require("../../utils/appError");
const { validate } = require('../../models/productModel');
const { Category } = require('../../models/categoryModel');


// cloudinary.api.delete_resources
const deleteImage = async image => {

  try {
    await cloudinary.api.delete_resources(image)
  } catch (ex) {
    throw new Error(ex.message);
  }
}


// ..........validation............
const fieldsValidation = (req, next) => {

  // productData object added to req
  req.productData = req.file && req.body && { ...req.body, photo: { publicId: req.file.filename, url: req.file.path } };

  // fields validation
  const { error } = validate(req.productData);

  //if error => throw it to global error handler
  if (error) {

    //removing prev image
    deleteImage(req.file.filename);
    next(new AppError(error.details[ 0 ].message, 400));
  }
}

//category validation
const categoryExists = async (req, next) => {
  try {
    const category = await Category.findOne({ _id: req.productData.category }).exec();

    if (category && category.name) return next()

    deleteImage(req.file.filename);

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


//cloudinary configuration
cloudinary.config({
  cloud_name: config.get('cloudinary.cloudName'),
  api_key: config.get('cloudinary.apiKey'),
  api_secret: config.get('cloudinary.apiSecret'),
});

//cloudinary storage instantiated
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "BOOK_TREKKER/PRODUCTS",
  },
});

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


module.exports.deleteImage = deleteImage;