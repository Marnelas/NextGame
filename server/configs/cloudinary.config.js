
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARYNAME,
  api_key: process.env.CLOUDINARYKEY,
  api_secret: process.env.CLOUDINARYSECRET
});

var storage = cloudinaryStorage({
    cloudinary,
    folder: 'user-profiles',
    allowedFormats: ['jpg', 'png'],
    filename: function (req, res, cb) {
        cb(null, res.originalname);
    }
});

const uploader = multer({ storage });
module.exports = uploader;