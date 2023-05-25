import multer from 'multer';
import { diskStorage } from 'multer';
import sharp from 'sharp';

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  
  filename: (req, file, cb) => {
    sharp(file.buffer)
      .resize(800, 800, { fit: 'inside' })
      .jpeg({ quality: 80 })
      .toBuffer((err, buffer) => {
        if (err) {
          return cb(err);
        }
        cb(null, file.originalname);
      });
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG , JPG and PNG are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize:  10 * 1024 * 1024 
  },
  fileFilter: fileFilter
});

export default upload;
