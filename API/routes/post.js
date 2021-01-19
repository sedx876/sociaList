const express = require('express')
const {getPosts, createPost} = require('../controllers/post')
const {createPostValidator} = require('../helpers/index')

const router = express.Router()

router
  .get('/', getPosts)
  .post('/post', createPostValidator, createPost)



module.exports = router