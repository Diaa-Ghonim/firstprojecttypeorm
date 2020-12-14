
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'abo-mandella',
  api_key: '719215592854856',
  api_secret: 'bspEe4Te2QxvJMla5TFfb22-oD8'
});

export { cloudinary };