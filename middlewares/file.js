const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require('gridfs-stream');
const { connect } = require("http2");
const mongoose = require('mongoose');


const mongoURI = process.env.DATABASE;
var storage = new GridFsStorage({
  url: mongoURI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-Mypets-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-Mypets-${file.originalname}`
    };
  }
});


const conn = mongoose.createConnection(mongoURI);

let gfs;
conn.once('open',()=>{
  gfs = Grid(conn.db,mongoose.mongo);
  gfs.collection('uploads');
});

var uploadFile = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFile);
module.exports = uploadFilesMiddleware;