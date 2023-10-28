const multer = require('multer');
const path = require('path');
const maxSize = 2 * 1024 * 1024;


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '_' + file.originalname)
    }
});

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/png'
        || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/jpeg'
       ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

const upload = multer({ storage: storage, fileFilter: filefilter }); // limits: { fileSize: maxSize },

module.exports = { upload };