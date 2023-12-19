const express = require('express');
const router =express.Router()
const MyControllers = require('../Controllers/Controllers')

router.post('/add-user' , MyControllers.RegisterUser)
router.post('/login-user' , MyControllers.loginUser)
router.post('/contact', MyControllers.ContactUs)

module.exports = router