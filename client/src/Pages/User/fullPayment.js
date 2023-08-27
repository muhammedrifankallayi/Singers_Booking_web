import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import UserHeader from '../../componants/user/userHeader'
import Footer from '../../componants/user/footer'
import { userRequest } from '../../axios'
import { toast } from 'react-hot-toast'
import { loadScript } from 'https://checkout.razorpay.com/v1/checkout.js';

function FullPayment() {
    const location = useLocation()
    const Data = location.state
    console.log('Datadkfdk', Data)
    const { booking_id, notification_id } = Data
    const navigator = useNavigate()
    const [booking, setBookings] = useState([])
    const getData = () => {
        userRequest({
            url: '/api/user/full-payment-booking',
            method: 'post',
            data: { id: booking_id, notification_id: notification_id }
        }).then((response) => {
            if (response.data.success) {
                setBookings(response.data.data)
            }
        }).catch((err) => {
            toast.error('please login after try again')
            localStorage.removeItem('token')
            navigator('/login')
        })
    }

    useEffect(() => {
        getData()
    }, [])
    const dateFormate = (dates) => {
        const timestamp = dates;
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
        return formattedDate
    }
    const fullPayment = async (id, balaceAmount) => {
        userRequest({
            url: '/api/user/full-payment',
            method: 'patch',
            data: { id: id, balaceAmount: balaceAmount }
        }).then((response) => {
            razorpayPayment(response.data.data)
        }).catch((err) => {
            toast.error('please login after try again')
            localStorage.removeItem('token')
            navigator('/login')
        })
    }
    function razorpayPayment(order) {
        var options = {
            "key": "rzp_test_IXqylz31HfGmCE",
            "amount": order.amount,
            "currency": "INR",
            "name": "SpotLight Booking",
            "description": "Test Transaction",
            "image": "/user/images/online-shopping.png",
            "order_id": order.id,
            // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
            "handler": function (response) {
                verifyPayment(response, order)
            },
            "prefill": {
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }

        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    }
    const verifyPayment = async (payment, order) => {
        userRequest({
            url: '/api/user/verify-full-payment',
            method: 'patch',
            data: { payment: payment, order: order }
        }).then((response) => {
            if (response.data.success) {
                toast.success(response.data.message)
                navigator('/bookings')
            } else {
                toast.error(response.data.message)
            }
        }).catch((err) => {
            toast.error('please login after try again')
            localStorage.removeItem('token')
            navigator('/login')
        })
    }

    return (
        <>
            <UserHeader />
            <div class="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">

                <div class="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
                    <img class="w-full" alt="image of a girl posing" src={booking?.orders?.[0]?.image} />
                </div>
                <div class="md:hidden">
                    <img class="w-full" alt="image of a girl posing" src={booking?.orders?.[0]?.image} />
                </div>
                <div class="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
                    <div class="border-b border-gray-200 pb-6">
                        <p class="text-sm leading-none text-gray-600 dark:text-gray-300 "></p>
                        <h1 class="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">Payment</h1>
                    </div>
                    <div class="py-4 border-b border-gray-200 flex items-center justify-between">
                        <p class="text-base leading-4 text-gray-800 dark:text-gray-300">Artist</p>
                        <div class="flex items-center justify-center">
                            <p class="text-sm leading-none text-gray-600 dark:text-gray-300">{booking?.orders?.[0]?.artist}</p>
                        </div>
                    </div>
                    <div class="py-4 border-b border-gray-200 flex items-center justify-between">
                        <p class="text-base leading-4 text-gray-800 dark:text-gray-300">category</p>
                        <div class="flex items-center justify-center">
                            <p class="text-sm leading-none text-gray-600 dark:text-gray-300 mr-3">{booking?.orders?.[0]?.category}</p>
                        </div>
                    </div>
                    <div class="py-4 border-b border-gray-200 flex items-center justify-between">
                        <p class="text-base leading-4 text-gray-800 dark:text-gray-300">Booking date</p>
                        <div class="flex items-center justify-center">
                            <p class="text-sm leading-none text-gray-600 dark:text-gray-300 mr-3">{dateFormate(booking?.orders?.[0]?.date)}</p>
                        </div>
                    </div>
                    <div class="py-4 border-b border-gray-200 flex items-center justify-between">
                        <p class="text-base leading-4 text-gray-800 dark:text-gray-300">Paid amount </p>
                        <div class="flex items-center justify-center">
                            <p class="text-sm leading-none text-gray-600 dark:text-gray-300 mr-3">{booking?.orders?.[0]?.amount}</p>
                        </div>
                    </div>
                    <div class="py-4 border-b border-gray-200 flex items-center justify-between">
                        <p class="text-base leading-4 text-gray-800 dark:text-gray-300">Balance amount </p>
                        <div class="flex items-center justify-center">
                            <p class="text-sm leading-none text-gray-600 dark:text-gray-300 mr-3">{booking?.orders?.[0]?.fullAmount - booking?.orders?.[0]?.amount}</p>
                        </div>
                    </div>
                    <div class="py-4 border-b border-gray-200 flex items-center justify-between">
                        <p class="text-base leading-4 text-gray-800 dark:text-gray-300">Address </p>
                        <div class="flex items-center justify-center">
                            <p class="text-sm leading-none text-gray-600 dark:text-gray-300 mr-3">{booking?.orders?.[0]?.address + '. ' + booking?.orders?.[0]?.pincode}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => fullPayment(booking?.orders?.[0]?._id, booking?.orders?.[0]?.fullAmount - booking?.orders?.[0]?.amount)}
                        class="dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700 focus:outline-none">
                        Payment
                    </button>
                </div>
            </div >
            <Footer />
        </>
    )
}

export default FullPayment