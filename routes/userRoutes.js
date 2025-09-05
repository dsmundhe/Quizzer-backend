const express = require('express');
const { signup, login, editProfile, deleteProfile } = require('../controller/userController');

const { authenticate } = require('../auth/tokenVerify')

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.put('/edit/:id', authenticate, editProfile); // PUT to edit user by ID
router.delete('/delete/:id', authenticate, deleteProfile); // DELETE user by ID

module.exports = router;
