const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path')
const crypto = require('crypto')//to generate file name
const mongoose = require('mongoose')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const app = express()

