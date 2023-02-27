const multer = require("multer");
const path = require("path");
const uuid = require("uuid").v4;

// define destination , where to store files
// destination directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "video") {
      const rootDir = path.dirname(require.main.filename);
      // path where videos will be saved  =>    main root directory -> public -> videos
      cb(null, path.join(rootDir, "public/").concat("videos"));
    }
  },
  filename: (req, file, cb) => {
    const videoExt = file.mimetype.split("/")[1];
    const id = uuid();
    // video_ is prefix , + random id given + video extension
    cb(null, "video_" + id + "." + videoExt);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "video/mp4") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

exports.videoUpload = multer({ storage, fileFilter });
