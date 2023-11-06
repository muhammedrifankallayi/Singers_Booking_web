import React, { useEffect, useState } from 'react'
import UserHeader from '../../componants/user/userHeader'
import Footer from '../../componants/user/footer'
import { userRequest } from '../../axios'
import { toast } from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
// import { loadScript } from 'https://checkout.razorpay.com/v1/checkout.js';
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../Redux/alertSlice'

function ConfirmBooking() {
    const [bookingData, setBookingData] = useState()
    const [category, setCategory] = useState()
    const location = useLocation()
    const booking_id = location.state
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getData = () => {
        dispatch(showLoading())
        userRequest({
            url: '/api/user/confirm_booking_data',
            method: 'post',
            data: { booking_id: booking_id }
        }).then((response) => {
            dispatch(hideLoading())
            if (response.data.success) {
                setBookingData(response.data.data)
                setCategory(response.data.category)
            }
        }).catch((err) => {
            dispatch(hideLoading())
            toast.error('please login after try again')
            localStorage.removeItem('token')
            navigate('/login')
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
    const advancePayment = async (req, res) => {
        const advancepayment = await advance()
        dispatch(showLoading())
        userRequest({
            url: '/api/user/advance-payment',
            method: 'post',
            data: { booking_id: bookingData?.[0].orders?._id, advance: advancepayment }
        }).then((response) => {
            dispatch(hideLoading())
            if (response.data.success) {
                toast(response.data.message)
                razorpayPayment(response.data.data)
            } else {
                toast.error('payment not  compleate')
            }
        }).catch((error) => {
            dispatch(hideLoading())
            toast.error('please login after try again')
            localStorage.removeItem('token')
            navigate('/login')
        })

        // sub edit

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

        const verifyPayment = (payment, order) => {
            dispatch(showLoading())
            userRequest(({
                url: '/api/user/varifiy-payment',
                method: 'post',
                data: {
                    payment: payment,
                    order: order
                }
            })).then((response) => {
                dispatch(hideLoading())
                if (response.data.success) {
                    toast.success('success')
                    navigate('/bookings')
                } else {
                    toast.error('payment fail')
                }
            }).catch((err) => {
                dispatch(hideLoading())
                toast.error('please login after try again')
                localStorage.removeItem('token')
                navigate('/login')

            })
        }
    }
    function advance() {
        return bookingData?.[0].orders?.amount * 10 / 100
    }
    return (
        <>

            < UserHeader />
            < div className="flex justify-center items-center h-screen  confirm_booking_main_div" >
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md confirm_bookings">
                    <h1 className="text-3xl font-semibold mb-6 text-center confirm_booking_heading">Your Booking </h1>
                    <div className="border-b pb-4 mb-4">
                        <span style={{ marginRight: '50px' }}>Artist</span>
                        <h1 style={{ display: 'inline-block', marginBottom: '0', marginLeft: '66px' }}>
                            {bookingData?.[0].orders?.artist}
                        </h1>
                    </div>
                    <div className="border-b pb-4 mb-4">
                        <span style={{ marginRight: '50px' }}>Catergory</span>
                        <h1 style={{ display: 'inline-block', marginBottom: '0', marginLeft: '37px' }}>
                            {category}
                        </h1>
                    </div>
                    <div className="border-b pb-4 mb-4">
                        <span style={{ marginRight: '50px' }}>Booking Date</span>
                        <h1 style={{ display: 'inline-block', marginBottom: '0', marginLeft: '10px' }}>
                            {dateFormate(bookingData?.[0].orders?.date)}                        </h1>
                    </div>
                    <div className="border-b pb-4 mb-4">
                        <span style={{ marginRight: '50px' }}>State</span>
                        <h1 style={{ display: 'inline-block', marginBottom: '0', marginLeft: '73px' }}>
                            {bookingData?.[0].orders?.state}
                        </h1>
                    </div>
                    <div className="border-b pb-4 mb-4">
                        <span style={{ marginRight: '50px' }}>District</span>
                        <h1 style={{ display: 'inline-block', marginBottom: '0', marginLeft: '55px' }}>
                            {bookingData?.[0].orders?.district}
                        </h1>
                    </div>
                    <div className="border-b pb-4 mb-4">
                        <span style={{ marginRight: '50px' }}>Pin code</span>
                        <h1 style={{ display: 'inline-block', marginBottom: '0', marginLeft: '44px' }}>
                            {bookingData?.[0].orders?.pincode}
                        </h1>
                    </div>
                    <div className="border-b pb-4 mb-4">
                        <span style={{ marginRight: '50px' }}>Address</span>
                        <h1 style={{ display: 'inline-block', marginBottom: '0', marginLeft: '49px' }}>
                            {bookingData?.[0].orders?.address}
                        </h1>
                    </div>
                    <div className="border-b pb-4 mb-4">
                        <span style={{ marginRight: '50px' }}>Total Amount</span>
                        <h1 style={{ display: 'inline-block', marginBottom: '0', marginLeft: '10px' }}>
                            {bookingData?.[0].orders?.amount}
                        </h1>
                    </div>
                    <div className="border-b pb-4 mb-4">
                        <span style={{ marginRight: '50px' }}>Advance(10%)</span>
                        <h1 style={{ display: 'inline-block', marginBottom: '0', marginLeft: '10px' }}>
                            {advance()}
                        </h1>
                    </div>
                    {/* Proceed to Payment Button */}
                    <div className="mt-6 flex justify-end">
                        <button onClick={() => advancePayment()}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                            Advance Payment
                        </button>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}

export default ConfirmBooking