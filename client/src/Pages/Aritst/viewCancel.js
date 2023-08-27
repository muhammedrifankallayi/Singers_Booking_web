import React, { useEffect, useState } from 'react'
import ArtistHeader from '../../componants/artist/artistHeader'
import ArtistFooter from '../../componants/artist/artistFooter'
import { useLocation, useNavigate } from 'react-router-dom'
import { request } from '../../axios'
import { toast } from 'react-hot-toast'

function ViewCancel() {
    const location = useLocation()
    const data = location.state?.id
    console.log('data', data)
    const [singleBookingData, setSingleBookingData] = useState([])
    const Navigate = useNavigate()

    const getData = () => {
        request({
            url: '/api/artist/get-booking-data',
            method: 'post',
            data: { booking_id: data }
        }).then((response) => {
            if (response.data.success) {
                setSingleBookingData(response.data.data)
            } else {
                toast(response.data.message)
            }
        }).catch((err) => {
            // localStorage.removeItem('artistKey')
            // Navigate('/artist/login')
        })
    }
    useEffect(() => {
        getData()
    }, [])
    console.log(singleBookingData)

    return (
        <>
            <ArtistHeader />
            <div className='booking_infoArtist'>
                <div className='info_booking_div'>
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">Cancelled Booking</h3>
                    </div>
                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{singleBookingData?.[0]?.firstName}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Booking for</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{singleBookingData?.[0]?.artist}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{singleBookingData?.[0]?.email}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Amount</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{singleBookingData?.[0]?.fullAmount}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Date</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{singleBookingData?.[0]?.date}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {singleBookingData?.[0]?.address}
                                </dd>
                            </div>
                            {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <div className='booking_view-div'>
                                    <button
                                        type="button"
                                        class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"

                                    >Accept
                                    </button>
                                </div>
                                <div className='booking_view-div'>
                                    <button
                                        type="button"
                                        class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"

                                    >Reject
                                    </button>
                                </div>

                            </div> */}
                        </dl>
                    </div>
                </div >
            </div >
            <ArtistFooter />
        </>
    )
}

export default ViewCancel