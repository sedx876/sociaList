const express = require('express')
const {getPosts, createPost} = require('../controllers/post')
const {createPostValidator} = require('../helpers/index')
const { requireSignin } = require('../controllers/auth')
const { userById } = require('../controllers/user')

const router = express.Router()

router
  .get('/posts', getPosts)
  .post('/post', requireSignin, createPostValidator, createPost)

// any route containing :userId, our app will first execute userById()
router.param('userId', userById)

module.exports = router