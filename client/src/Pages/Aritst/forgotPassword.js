import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Adminloginhead from '../../publicAndProtect/Artist/Adminloginhead'


function ArtistforgotPassword() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        otp: false,
        responseOtp: ''
    })
    const handelInputChange = (event) => {
        const { name, value } = event.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }
    const handelSubmit = async (event) => {
        try {
            event.preventDefault()
            console.log(formData.otp.length)
            if (formData.otp === false) {
                const response = await axios.post('/api/artist/forgotpassword', formData)
                if (response.data.success) {
                    toast.success(response.data.message)
                    setFormData({ otp: true, responseOtp: response.data.otp })
                } else {
                    toast.error(response.data.message)
                }
            } else {
                console.log(formData.responseOtp, 'respose')
                console.log(formData.otp, 'otp')
                if (formData.responseOtp === formData.otp) {
                    toast('Create new password')
                    navigate('/artist/setpassword')
                } else {
                    toast.error('Your enterd otp has inccorrect')
                }
            }
        } catch (error) {
            console.log('somthing went wrong', error)
        }
    }
    return (
        <>
            <Adminloginhead />
            <div className="bg-cover bg-center h-screen overflow-hidden">
                <div className="container mx-auto h-full">
                    <div className="flex justify-center items-center ">
                        <div className="w-full md:w-1/3">
                            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 back">
                                <div className="text-center">
                                    <img src="https://th.bing.com/th/id/OIP.exvxEQWxYmmsst3mZaMugAHaHm?pid=ImgDet&rs=1" alt="Padlock" className="mx-auto mb-4 h-20 w-20 " style={{ borderRadius: '5px' }} />
                                    <h2 className="text-center">Forgot Password?</h2>
                                    <p className="text-white">You can reset your password here.</p>
                                </div>
                                <form id="register-form" className="mt-4" onSubmit={handelSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                                                <i className="glyphicon glyphicon-envelope color-blue"></i>
                                            </span>
                                            <input
                                                id="email"
                                                name="email"
                                                onChange={handelInputChange}
                                                placeholder="Email Address"
                                                className="form-input py-2 px-4 pl-10 block w-full rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                                                type="email"
                                            />
                                        </div>
                                    </div>
                                    {formData.otp && (
                                        <div className="mb-4">
                                            <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">Enter OTP</label>
                                            <input
                                                id="otp"
                                                name="otp"
                                                onChange={handelInputChange}
                                                placeholder="Enter OTP"
                                                className="form-input py-2 px-4 block w-full rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                                                type="number"
                                            />
                                        </div>
                                    )}
                                    <div className="mb-6">
                                        <button
                                            name="recover-submit"
                                            className="btns btn-primary btn-block w-full py-2 px-4 rounded-md text-white font-semibold focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-blue-600"
                                            type="submit"
                                        >
                                            {formData.otp ? 'Enter' : 'Submit'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}

export default ArtistforgotPassword