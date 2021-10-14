// const { router } = require('../app');
const multer = require('multer');
const sharp = require('sharp');
const Stair = require('../models/stairModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError('To nie zdjęcie!. Proszę udostępnić tylko zdjęcia', 400),
      false
    );
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadStairImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

exports.resizeStairImages = catchAsync(async (req, res, next) => {
  // console.log(req.files);

  if (!req.files.imageCover || !req.files.images) return next();

  // 1 Cover image
  req.body.imageCover = `stairs-${req.params.id}-${Date.now()} - cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/images/stairs/${req.body.imageCover}`);

  //2 Images
  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `stairs-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
      await sharp(file.buffer)
        .resize(800, 800)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/stairs/${filename}`);
      req.body.images.push(filename);
    })
  );
  console.log(req.body);

  next();
});
exports.getAllStairs = factory.getAll(Stair);

exports.getStair = factory.getOne(Stair);

exports.createStair = factory.createOne(Stair);

exports.updateStair = factory.updateOne(Stair);

exports.deleteStair = factory.deleteOne(Stair);
