import React, { useEffect, useState } from 'react'
import ArtistHeader from '../../componants/artist/artistHeader'
import ArtistFooter from '../../componants/artist/artistFooter'
import { useLocation, useNavigate } from 'react-router-dom'
import { request } from '../../axios'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../Redux/alertSlice'

function ViewCancel() {
    const location = useLocation()
    const data = location.state?.id
    const [singleBookingData, setSingleBookingData] = useState([])
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const getData = () => {
        dispatch(showLoading())
        request({
            url: '/api/artist/get-booking-data',
            method: 'post',
            data: { booking_id: data }
        }).then((response) => {
            dispatch(hideLoading())
            if (response.data.success) {
                setSingleBookingData(response.data.data)
            } else {
                toast(response.data.message)
            }
        }).catch((err) => {
            dispatch(hideLoading())
            // localStorage.removeItem('artistKey')
            // Navigate('/artist/login')
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

    return (
        <>
            <ArtistHeader />
            <div className='booking_infoArtist mb-5'>
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
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{dateFormate(singleBookingData?.[0]?.date)}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {singleBookingData?.[0]?.address}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div >
            </div >
            <ArtistFooter />
        </>
    )
}

export default ViewCancel