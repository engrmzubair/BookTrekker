const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController')


//get all users
router.get('/', getUsers)


module.exports = router;