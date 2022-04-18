const express = require('express')
const postController = require('../controllers/postController.js')

const router = express.Router();

router.get('/', postController.getPosts);

module.exports = router;