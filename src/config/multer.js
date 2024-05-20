import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';


cloudinary.config({
  cloud_name: 'dfm8oiovu',
  api_key: '275626562167418',
  api_secret: 'p8tHhz0TzbMtljRkywT2Eh9GXCc'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['doc', 'docx', 'txt', 'pdf', 'jpg', 'jpeg', 'png'],
    use_filename: true,
    unique_filename: true
  },
  filename: (req, file, cb) => {
    const uniqueFilename = Date.now() + '-' + file.originalname;
    cb(null, uniqueFilename);
  }
});

const upload = multer({ storage: storage });

export default upload;
