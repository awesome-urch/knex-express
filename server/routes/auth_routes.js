'use strict'

const router = require('express').Router()
const {
  postLoginTest,
  postLogin,
  postRegister
} = require('../controllers/auth_controller')

router.post('/login', postLogin);

// router.post('/test', postLoginTest);

// router.route('/test')
//   .post(postLoginTest)

// router.route('/login')
//   .post(postLogin)

router.route('/register')
  .post(postRegister)

module.exports = router
