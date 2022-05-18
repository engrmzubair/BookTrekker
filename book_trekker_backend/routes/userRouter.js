const express = require('express');
const { requireSignin, isAuth, isAdmin } = require('../controllers/authController');
const router = express.Router();
const { userById } = require('../controllers/userController')


router.get('/secret/:userId', [ requireSignin, isAuth, isAdmin ], (req, res) => {

  res.json({
    user: req.profile
  })

})


router.param("userId", userById)




module.exports = router;