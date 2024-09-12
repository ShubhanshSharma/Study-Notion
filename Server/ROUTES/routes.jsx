const express = require('express');
const { signUp, logIn, sendOTP } = require('../CONTROLLER/auth');
const { createCourse, showAllCourses } = require('../CONTROLLER/Course');
const { verifySignature, capturePayment } = require('../CONTROLLER/Payments');

const router = express.Router();




router.post('/api/auth/signup', signUp);
router.post('/api/auth/login',logIn);
router.post('/api/auth/verify-otp',sendOTP);
router.post('/api/courses/createCourse', createCourse);
router.get('/api/courses/showCourse', showAllCourses);
router.post('/api/payment/verifySignature', verifySignature);
router.post('/api/payment/capturePayment', capturePayment);
router.post('/api/auth/');
router.post('/api/auth/');
router.post('/api/auth/');
router.post('/api/auth/');
router.post('/api/auth/');