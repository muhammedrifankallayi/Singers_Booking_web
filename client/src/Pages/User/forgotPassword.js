import React, { useState } from 'react'
import firebase from '../../fireBase/fireBase';
// import { Button, Form, Input } from 'antd'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// import './signUp.css'
import '../User/forgotPassword.css'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import GusetHeader from '../../publicAndProtect/gusetHeader';


function Forgotpassword() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        mobile: false,
        otp: false
    });

    const handelChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const configureCaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // onSignInSubmit();
                console.log('recaptchaVerifier')
            },
            defaultCountry: 'IN'
        });
    }


    const onSignInSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post("/api/user/forgot", formData)
        console.log(response.data.success)
        if (response.data.success) {
            configureCaptcha()
            const phoneNumber = "+91" + formData.mobile
            console.log(phoneNumber)
            const appVerifier = window.recaptchaVerifier;
            firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                    console.log('OTP has been sent')
                }).catch((error) => {
                    console.log('SMS Not send')
                    console.log(error)
                });
        } else {
            toast("mobile no inccrect please check")
        }
    }
    const onSubmitOTP = (e) => {
        e.preventDefault()
        const code = formData.otp
        console.log(code)
        window.confirmationResult.confirm(code).then((result) => {
            const user = result.user;
            console.log(JSON.stringify(user))
            navigate('/setpassword')
        }).catch((error) => {
            toast('Otp has inccrect please check')
        });
    }
    return (
        <>
            <GusetHeader />
            <div className='flex justify-center items-center min-h-screen bg-gray-100 forgot'>
                <div className='bg-white rounded-lg shadow-md p-8 max-w-md w-full forgot_form '>

                    <h1 className='text-3xl font-bold mb-6 text-center'>Forgot Password</h1>

                    {/* Reset Password Form */}
                    <form onSubmit={onSignInSubmit} className='mb-6'>
                        <div id='sign-in-button'></div>
                        <div className='mb-4'>
                            <label htmlFor='mobile' className='block text-gray-700 font-semibold mb-2 enter_otp'>
                                Mobile No
                            </label>
                            <input
                                type='number'
                                id='mobile'
                                className='input'
                                name='mobile'
                                placeholder='Enter your mobile number'
                                required
                                onChange={handelChange}
                            />
                        </div>
                        <button type='submit' className='butn w-full'>
                            Submit
                        </button>
                    </form>

                    {/* Enter OTP Form */}
                    <h2 className='text-xl font-semibold mt-6 mb-3 text-center enter_otp'>Enter OTP</h2>
                    <form onSubmit={onSubmitOTP} className='mb-6'>
                        <div className='mb-4'>
                            <label htmlFor='otp' className='block text-gray-700 font-semibold mb-2 enter_otp'>
                                OTP
                            </label>
                            <input
                                type='number'
                                id='otp'
                                className='input'
                                name='otp'
                                placeholder='Enter OTP'
                                required
                                onChange={handelChange}
                            />
                        </div>
                        <button type='submit' className='butn w-full'>
                            Submit
                        </button>
                    </form>

                    {/* Link to Login */}
                    <p className='text-center mt-4'>
                        <Link className='text-blue-500 hover:underline' to='/login'>
                            Go to Login
                        </Link>
                    </p>

                </div>
            </div>


        </>
    );
}

export default Forgotpassword;
