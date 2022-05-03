const express = require('express')
const postController = require('../controllers/postController.js')
const authController = require('../controllers/authController.js')
const router = express.Router();
const upload = require('../data/upload.js');


router.get('/',  postController.renderPosts);

router.post('/', upload.single('img'), postController.createPost);

router.delete('/:id', postController.deletePost);

router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.get('/login', authController.index);

module.exports = router;