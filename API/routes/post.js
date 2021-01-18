const express = require('express')
const {getPosts, createPost} = require('../controllers/post')
const validator = require('../helpers/index')

const router = express.Router()

router
  .get('/', getPosts)
  .post('/post', validator.createPostValidator, createPost)



module.exports = router