const userController = require('../Controllers/UserController')
const express = require('express')
const authMiddileware = require('../Middlewares/authMiddileware')
const userModel = require('../Models/userModel')
const userRoute = express()
const session = require('express-session')
const sessionConfig = require('../Config/sessionConfig')
const upload = require('../Config/userMulter')
userRoute.use(session({
    secret: sessionConfig.sessionScrect,
    saveUninitialized: true,
    resave: false
}))

// sign Up and login 
userRoute.post('/signup', userController.signUp)
userRoute.post('/login', userController.login)
userRoute.post('/otp', userController.otp)
userRoute.post('/forgot', userController.forgot)
userRoute.post('/setpassword', userController.setPassword)
userRoute.post('/get-user-info-by-id', authMiddileware, userController.authorization)
userRoute.post('/user_profiledata', authMiddileware, userController.profile)
userRoute.post('/edit-profile', upload.upload.single('image'), authMiddileware, userController.editProfile)
// 
userRoute.post('/get-home-banner-data', authMiddileware, userController.getBannerData)
userRoute.post('/get-artist-data', authMiddileware, userController.getArtstMoreData)
userRoute.post('/artist-view', authMiddileware, userController.aritsView)
userRoute.post('/bookartist', authMiddileware, userController.aritistBooking)
userRoute.post('/notifications', authMiddileware, userController.userNotification)
userRoute.post('/confirm_booking_data', authMiddileware, userController.confirmBookingData)
userRoute.post('/advance-payment', authMiddileware, userController.advancePayment)
userRoute.post('/varifiy-payment', authMiddileware, userController.verifyPayment)
userRoute.post('/cancel-swal', authMiddileware, userController.cancelSwal)
userRoute.post('/partner-data', authMiddileware, userController.partnerProfileData)

userRoute.get('/get-booking-data', authMiddileware, userController.bookingData)
userRoute.get('/getAll-post', authMiddileware, userController.allPost)
userRoute.get('/get-userNotificaions', authMiddileware, userController.getNotifications)
userRoute.get('/full-payment-notificaions', authMiddileware, userController.notificationCreate)
userRoute.get('/review-notificaion', authMiddileware, userController.reviewNotification)

userRoute.patch('/cancel-booking', authMiddileware, userController.cancelBooking)
userRoute.patch('/full-payment', authMiddileware, userController.fullpaymentDone)
userRoute.patch('/verify-full-payment', authMiddileware, userController.verifyFullPayment)
userRoute.post('/all-media', authMiddileware, userController.allMedia)
userRoute.post('/full-payment-booking', authMiddileware, userController.fullPayment)
userRoute.post('/review', authMiddileware, userController.writeReview)


module.exports = userRoute