import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Adminlayout from '../../componants/admin/Adminlayout'
import AdminFooter from '../../componants/admin/adminFooter'

function BookingsView() {
    const locaion = useLocation()
    const datas = locaion.state

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
            <Adminlayout />
            <div className="admin-bookings sm:ml-64 ">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <img src={datas.image} alt="Artist Image" class="w-32 h-32 rounded-full mx-auto mb-4" />
                    <h2 class="text-xl font-semibold text-gray-800">{datas.artist}</h2>
                    <p class="text-gray-600 mb-2">{datas.category}</p>

                    <div class="border-t border-gray-300 my-4"></div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="text-gray-700">Date:</p>
                            <p>{dateFormate(datas.date)}</p>
                        </div>
                        <div>
                            <p class="text-gray-700">Amount:</p>
                            <p>{datas.amount}</p>
                        </div>
                    </div>

                    <div class="border-t border-gray-300 my-4"></div>

                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Address</h3>
                    <p class="text-gray-600">{datas.district}, {datas.state} - {datas.pincode}</p>

                    <div class="border-t border-gray-300 my-4"></div>

                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Contact</h3>
                    <p class="text-gray-600">{datas.firstName}</p>
                    <p class="text-gray-600">{datas.email}</p>

                    <div class="border-t border-gray-300 my-4"></div>

                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Payment Details</h3>
                    <p class="text-gray-600">Payment ID: {datas.payment_id}</p>
                    <p class="text-gray-600">Status: {datas.status}</p>

                    {/* <div class="border-t border-gray-300 my-4"></div>

                    <p class="text-gray-600 text-xs">{datas.timestamp}</p> */}
                </div>
            </div >
            <AdminFooter />
        </>
    )
}

export default BookingsView