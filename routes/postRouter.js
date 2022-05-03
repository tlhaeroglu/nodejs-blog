const express = require('express');
const postController = require('../controllers/postController.js')
const authController = require('../controllers/authController.js')



const router = express.Router();

router.get('/:url', postController.renderPost);

router.post('/', postController.makeComment);

module.exports = router;