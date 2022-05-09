const express = require('express');
const router = express.Router();


//get all users
router.get('/', (req, res) => {
  res.send('An array of all users.')
})


module.exports = router;