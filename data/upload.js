const multer = require('multer');
const uuid = require('uuid');

var path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img/')
  },
  filename: function (req, file, cb) {
    cb(null, uuid.v4() + path.extname(file.originalname)) 
  }
})

const upload = multer({ storage: storage })
module.exports = upload