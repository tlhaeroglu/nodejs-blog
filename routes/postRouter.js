const express = require('express');
const postController = require('../controllers/postController.js')

const router = express.Router();

router.get('/:id', postController.getPost);

module.exports = router;