
import multer from 'multer';
import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { cloudinary } from './cloudinary.config';

const upload = multer({
  storage: multer.diskStorage({
    destination(req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) {
      callback(null, './images');
    },
    filename(req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) {
      callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
  }),

  fileFilter(req: Request, file: Express.Multer.File, callback) {
    // console.log(file);

    const fileTypes = /jpg|jpeg|png|gif|jfif/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
      callback(null, true);
    } else {
      callback(new Error('error image type'));
    }
  },
  limits: {
    fileSize: 5000000,
  },
});

// after previous specific there are some of validation on uploaded photos

const CustomMulter = (req: Request, res: Response, next: NextFunction) => {
  upload.any()(req, res, async (err: any) => {
    console.log(err, 'error');

    if (err instanceof multer.MulterError) {
      console.log('upload image error', err.message);

      next(err);
    } else if (err) {
      console.log(err);
      next(err)
    }
    console.log(req.file);
    console.log(req.files);
    // const result = await cloudinary.uploader.upload(req.files[0].path, {
    //   folder: '/images',
    //   unique_filename: true,

    // })
    next();
  });
};
export { CustomMulter };





// const { CloudinaryStorage } = require('multer-storage-cloudinary');


// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'some-folder-name',
//     format: async (req, file) => 'png', // supports promises as well
//     public_id: (req, file) => 'computed-filename-using-request',
//   },
// });

// const parser = multer({ storage: storage });


// cloudinary.uploader.upload(
//   "./src/images/Mini+Daisies+Stem.jpg",
//   function (error, result) {
//     console.log(result, error)
//   }
// );