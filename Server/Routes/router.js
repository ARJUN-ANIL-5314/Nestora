const express = require('express');
const router = express.Router();
const { Category, Review } = require('../Controller/controller'); 
const { loginUser } = require('../Controller/Admin-log');
const userAuth  = require('../auth-middileware/login-auth');
const { dashbord } = require('../redirect-portal/Dashbord');
const {contact} =require('../Controller/Mailer')


// Routes

// Category section route
router.get('/category', Category);

// Reviws section route
router.get('/reviews',Review)


router.post('/login', loginUser); 


// nodemailer route
router.post('/contact-info',contact)


// User details route
router.get('/user-details', userAuth, dashbord);

// Middleware to check authentication
router.get('/auth-check', userAuth, (req, res) => {
    res.json({ message: 'Authenticated!', user: req.user });
});

module.exports = router;














// router.get('/admin-dashboard', verifyToken, (req, res) => {
//     res.json({ message: 'Welcome to Admin Dashboard', user: req.user });
// });

// Authentication Check Route