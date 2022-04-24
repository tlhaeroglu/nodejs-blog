const express = require('express')
const postController = require('../controllers/postController.js')
const router = express.Router();
const upload = require('../data/upload.js');


router.get('/', postController.getPosts);

router.post('/', upload.single('img'), postController.createPost);

router.delete('/:id', postController.deletePost);

module.exports = router;