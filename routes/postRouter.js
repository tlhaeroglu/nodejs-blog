const express = require('express');
const postController = require('../controllers/postController.js')


const router = express.Router();

router.get('/:id', postController.getPost);

router.post('/', postController.makeComment);

module.exports = router;