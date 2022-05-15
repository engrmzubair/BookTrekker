const express = require('express');
const router = express.Router();

//import routes
const {
  createCategory,
  categoryValidation,
  getCategory,
  categoryById,
  updateCategory,
  deleteCategory,
  getCategories
}
  = require('../controllers/categoryController');
const { isAdmin, requireSignin, isAuth } = require('../controllers/authController');
const { userById } = require('../controllers/userController');


//array of common used middleware for create and update controller
const common = [ requireSignin, isAuth, isAdmin, categoryValidation ];

//array of common used middleware for delete controller
const commonForDelete = [ requireSignin, isAuth, isAdmin ];

// routes
router.get('/', getCategories);
router.get('/:categoryId', getCategory)
router.post('/create/:userId', [ ...common, createCategory ]);
router.put('/:categoryId/:userId', [ ...common, updateCategory ]);
router.delete('/:categoryId/:userId', [ ...commonForDelete, deleteCategory ]);

router.param('userId', userById)
router.param('categoryId', categoryById)



module.exports = router;