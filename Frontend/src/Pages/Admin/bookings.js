import React, { useEffect, useState } from 'react'
import Adminlayout from '../../componants/admin/Adminlayout'
import { adminRequest } from '../../axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import AdminFooter from '../../componants/admin/adminFooter'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../Redux/alertSlice'

function AdminBookings() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [value, setValue] = useState([])
    const navigate = useNavigate()
    const [showMore, setShowMore] = useState(6)
    const dispatch = useDispatch()
    const getData = () => {
        dispatch(showLoading())
        adminRequest({
            url: '/api/admin/get-booking-data',
            method: 'get'
        }).then((response) => {
            dispatch(hideLoading())
            if (response.data.success) {
                setData(response.data.data)
                setValue(response.data.data)
            }
        }).catch((err) => {
            dispatch(hideLoading())
            toast.error('please login after try again')
            localStorage.removeItem('adminKey')
            navigate('/admin/login')
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
    const filtering = (values, secVal) => {
        if (secVal === 'Completed') {
            const val = value.filter((items) => {
                return values === '' ? items : items.orders.status === values || items.orders.status === 'Finsh' || items.orders.status === 'Completed'
            })
            setData(val)
        } else {
            const val = value.filter((items) => {
                return values === '' ? items : items.orders.status === values
            })
            setData(val)
        }
    }

    function handleShowMore() {
        setShowMore(showMore + 6);
    }
    function hideall() {
        setShowMore(6)
    }

    const View = (data) => {
        navigate('/admin/bookings-view', { state: data })
    }

    return (
        <>
            <Adminlayout />
            <div className="admin-bookings sm:ml-64 ">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div class="flex items-center justify-between py-4 bg-white dark:bg-gray-800">

                        <div>
                            <div class="dropdown">
                                <button class="drop_bookings">Filter</button>
                                <div class="dropdown-content">
                                    <a onClick={() => filtering('')}>All</a>
                                    <a onClick={() => filtering('Booked')}>Booked</a>
                                    <a onClick={() => filtering('Complete', 'Completed')}>Complete</a>
                                    <a onClick={() => filtering('Cancel')}>Cancel</a>
                                    <a onClick={() => filtering('waiting fullPayment')}>payment balance</a>
                                </div>
                            </div>
                        </div>

                        <label for="table-search" class="sr-only">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="table-search-users"
                                onChange={(e) => setSearch(e.target.value)}
                                class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search for users" />
                        </div>
                    </div>
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    User Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Artist Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Amount
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Paid
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Booking Date
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {data?.filter((element) => {
                                return search && search.toLowerCase() === '' ? element : element.orders.artist.toLowerCase().includes(search.toLowerCase())
                            })?.slice(0, showMore).map((itmes) => {
                                return < tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                                    <td scope="row" class="">
                                        <div class="px-6 py-4 text-base font-semibold">
                                            <div class="text-base font-semibold">{itmes.orders.firstName}</div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-base font-semibold">
                                        {itmes.orders.artist}
                                    </td>
                                    <td class="px-6 py-4 text-base font-semibold">
                                        {itmes.orders.fullAmount}
                                    </td>
                                    {itmes?.orders?.status === 'pending' || itmes?.orders?.status === 'Accepted' || itmes?.orders?.status === 'Rejected' ?
                                        (< td className="px-6 py-4 font-semibold">
                                            0
                                        </td>
                                        ) : (< td className="px-6 py-4 font-semibold">
                                            {itmes?.orders?.amount}
                                        </td>)
                                    }
                                    <td class="px-6 py-4 text-base font-semibold">
                                        {itmes.orders.category}
                                    </td>
                                    <td class="px-6 py-4 text-base font-semibold">
                                        {dateFormate(itmes.orders.date)}
                                    </td>
                                    <td class="px-6 py-4">
                                        <button
                                            type="button"
                                            onClick={() => View(itmes.orders)}
                                            class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        >View
                                        </button>
                                    </td>
                                </tr>
                            })
                            }
                        </tbody>
                    </table>
                    {showMore > 1 && showMore !== data.length && showMore < data.length && < div class="max-w-md mx-auto p-4 flex justify-center">
                        <button
                            id="showMoreBtn"
                            onClick={handleShowMore}
                            class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">
                            Show More
                        </button>
                    </div>
                    }
                    {showMore >= data.length && data.length != 6 && < div class="max-w-md mx-auto p-4 flex justify-center">
                        <button
                            id="showMoreBtn"
                            onClick={hideall}
                            class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">
                            Hide
                        </button>
                    </div>
                    }
                </div>
            </div >
            <AdminFooter />
        </>
    )
}

export default AdminBookings