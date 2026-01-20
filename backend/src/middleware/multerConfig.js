import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "uploads/");
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if(extName && mimeType){
    return cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

export const upload = multer({ storage, fileFilter });
