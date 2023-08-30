const express = require('express');
const router = express.Router();
const { register, login, updateUser, getUserInfo } = require('../controllers/user-controllers.js');



router.post('/register', register);
router.post('/login', login);
router.post('/updateUser/:id', updateUser);
router.get('/getUserInfo/:id', getUserInfo)

module.exports = router;