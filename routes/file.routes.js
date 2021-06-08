const express = require("express");
const { connect } = require("mongoose");
const router = express.Router();
const controller = require("../controllers/file.controller");

module.exports = function( app ){

    app.post("/uploadfile", controller.upload);

    app.get("/api/getfiles", controller.getListFiles);

    app.get("/api/getlastname", controller.getListFilesNames);

    app.get('/api/image/:filename', controller.getimage);

}
