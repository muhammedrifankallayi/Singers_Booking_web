import React, { useEffect, useState } from 'react'
import ArtistHeader from '../../componants/artist/artistHeader'
import { Link, useNavigate } from 'react-router-dom'
import { request } from '../../axios'
import ViewBooking from './viewBooking'
import { toast } from 'react-hot-toast'
import ArtistFooter from '../../componants/artist/artistFooter'
import { formatDistanceToNow } from 'date-fns';
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../Redux/alertSlice'

function Notification() {
    const navigate = useNavigate()
    const [notificationData, setnotificationData] = useState()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(showLoading())
        request({
            url: '/api/artist/get-notification-data',
            method: 'post',
        }).then((response) => {
            dispatch(hideLoading())
            if (response.data.success) {
                setnotificationData(response.data.data)
            } else {

            }
        }).catch((err) => {
            dispatch(hideLoading())
            console.log('please login after try again')
            localStorage.removeItem('artistKey')
            navigate('/artist/login')
        })
    }, [])
    const viewBooking = (id) => {
        try {
            navigate('/artist/viewbooking', { state: { id } })
        } catch (error) {
            toast('somthing went wrong')
        }
    }

    const viewCanell = (id) => {
        try {
            navigate('/artist/view-cancel', { state: { id } })
        } catch (error) {
            toast.error('Somthing went wrong')
        }
    }
    return (
        <>
            <ArtistHeader />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-semibold mb-6">Notifications</h1>
                {notificationData?.slice()
                    .reverse()
                    ?.map((element) => {
                        const timeAgo = formatDistanceToNow(new Date(element.timestamp), {
                            addSuffix: true,
                        });
                        return <div>
                            {element.status === true && < div className="bg-white rounded-lg shadow-lg p-4 notificaion_box" >

                                < ul className="divide-y divide-gray-300" >
                                    <li className="py-6 flex items-center justify-between">

                                        < div className="flex items-center">
                                            <img src="https://res.cloudinary.com/dqn0v17b6/image/upload/v1691827196/iyzozhxwdjfc1refuhlq.jpg" alt="Profile Image" className="h-10 w-10 rounded-full mr-6" />
                                            <div className="ml-11 userNotification_p flex flex-col justify-center">

                                                <p className="text-sm font-semibold mb-3">{element.name}</p>
                                                <p className="text-xs text-gray-500">{timeAgo}</p>
                                            </div>
                                        </div>

                                        {element.Actions === 'show' && < button
                                            type="button"
                                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                            onClick={() => viewBooking(element?.booking_id)}
                                        >View
                                        </button>}
                                        {element.Actions === 'hide' && < button
                                            type="button"
                                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                            onClick={() => navigate('/artist/profile')}
                                        >Show
                                        </button>}
                                        {element.Actions === 'Cancell' && < button
                                            type="button"
                                            onClick={() => viewCanell(element?.booking_id)}
                                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                        >View</button>}
                                    </li>
                                </ul>

                            </div>}
                        </div>
                    })
                }
            </div >
            < ArtistFooter />
        </>
    )
}

export default Notification