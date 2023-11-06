import React, { useEffect, useState } from 'react'
import ArtistHeader from '../../componants/artist/artistHeader'
import { toast } from 'react-hot-toast'
import { request } from '../../axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import ArtistFooter from '../../componants/artist/artistFooter'
import io from 'socket.io-client'

const socket = io('https://spot-light.website/');
function Bookings() {
    const navigate = useNavigate()
    const [bookingData, setBookingData] = useState([])
    const [value, setValue] = useState([])
    const [search, setSearch] = useState("")
    const [showMore, setShowMore] = useState(2);
    const getData = () => {
        try {
            request({
                url: '/api/artist/get-all-booking-datas',
                method: 'post',
            }).then((response) => {
                if (response.data.success) {
                    setBookingData(response.data.data)
                    setValue(response.data.data)
                } else {
                    setBookingData(response.data.data)
                    setValue(response.data.data)
                }
            }).catch((err) => {
                toast.error('please login after try again')
                localStorage.removeItem('artistKey')
                navigate('/artist/login')
            })
        } catch (error) {
            toast.error('somthting went wrong')
        }
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

    const cancelBooking = (booking_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to Cancel this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Cancel it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                request({
                    url: '/api/artist/cancel-booking',
                    method: 'patch',
                    data: { booking_id: booking_id }
                }).then((response) => {
                    if (response.data.success) {
                        toast.success(response.data.message)
                        socket.emit('notifications', { count: response.data.count, room: response.data.room })
                    } else {
                        toast.success(response.data.message)
                    }
                }).catch((error) => {
                    toast('please login after try again')
                    localStorage.removeItem('artistKey')
                    navigate('/artist/login')
                })
            }
        })
    }
    const filtering = (values, secVal) => {
        if (secVal === 'Completed') {
            const val = value.filter((items) => {
                return values === '' ? items : items.orders.status === values || items.orders.status === 'Finsh' || items.orders.status === 'Completed'
            })
            setBookingData(val)
        } else {
            const val = value.filter((items) => {
                return values === '' ? items : items.orders.status === values || items.orders.status === 'Finsh'
            })
            setBookingData(val)
        }

    }
    function handleShowMore() {
        setShowMore(showMore + 2);
    }
    function hideall() {
        setShowMore(2)
    }

    const chatUser = (payment_id) => {
        navigate('/artist/personal-chating', { state: payment_id })
    }
    return (
        <>
            <ArtistHeader />
            <div className='booking_listing_div'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
                        <div>
                            <div class="dropdown">
                                <button class="dropbtn">Filter</button>
                                <div class="dropdown-content">
                                    <a onClick={() => filtering('')}>All</a>
                                    <a onClick={() => filtering('Booked')}>Booked</a>
                                    <a onClick={() => filtering('Complete', 'Completed')}>Complete</a>
                                    <a onClick={() => filtering('Cancel')}>Cancel</a>
                                    <a onClick={() => filtering('waiting fullPayment')}>payment balance</a>
                                </div>
                            </div>
                        </div>
                        <label for="table-search" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="table-search-users"
                                onChange={(e) => setSearch(e.target.value)}
                                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search for Bookings" />
                        </div>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-7">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Paid
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    State
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    district
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Chat
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingData?.filter((bookings) => {
                                return search && search.toLowerCase() === "" ? bookings : bookings?.orders?.firstName.toLowerCase().includes(search.toLowerCase())
                            })?.slice(0, showMore).map((element, index) => {
                                return < tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                                    <td className="w-4 p-4 font-semibold">
                                        {index + 1}
                                    </td>

                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="pl-3">
                                            <div className="text-base font-semibold">{element?.orders?.firstName}</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4 font-semibold">
                                        {element?.orders?.fullAmount}
                                    </td>
                                    {element?.orders?.status === 'pending' || element?.orders?.status === 'Accepted' || element?.orders?.status === 'Rejected' ?
                                        (< td className="px-6 py-4 font-semibold">
                                            0
                                        </td>
                                        ) : (< td className="px-6 py-4 font-semibold">
                                            {element?.orders?.amount}
                                        </td>)
                                    }
                                    <td className="px-6 py-4 font-semibold">
                                        <div className="flex items-center">
                                            {element?.orders?.category}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold">
                                        <div className="flex items-center">
                                            {dateFormate(element?.orders?.date)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold">
                                        <div className="flex items-center">
                                            {element?.orders?.state}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold">
                                        <div className="flex items-center">
                                            {element?.orders?.district}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {element?.orders?.status === 'Booked' && <button
                                            type="button"
                                            onClick={() => cancelBooking(element?.orders?._id)}
                                            class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancel</button>}
                                    </td>
                                    <td className="px-6 py-4">
                                        {element?.orders?.status === 'Booked' && <button
                                            type="button"
                                            onClick={() => chatUser(element?.orders.payment_id)}
                                            class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Chat</button>}
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    {showMore > 1 && showMore !== bookingData.length && showMore < bookingData.length && < div class="max-w-md mx-auto p-4 flex justify-center">
                        <button
                            id="showMoreBtn"
                            onClick={handleShowMore}
                            class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">
                            Show More
                        </button>
                    </div>
                    }
                    {showMore >= bookingData.length && bookingData.length != 2 && < div class="max-w-md mx-auto p-4 flex justify-center">
                        <button
                            id="showMoreBtn"
                            onClick={hideall}
                            class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">
                            Hide
                        </button>
                    </div>
                    }
                </div >
            </div >
            <ArtistFooter />
        </>
    )
}

export default Bookings
