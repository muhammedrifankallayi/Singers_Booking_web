import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Adminlayout from '../../componants/admin/Adminlayout'
import ReactApexChart from 'react-apexcharts';
import { adminRequest } from '../../axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AdminFooter from '../../componants/admin/adminFooter';

function AdminHome() {
    const [bookingData, setBookingData] = useState([])
    const [userData, setUserData] = useState([])
    const [artistData, setArtistData] = useState([])

    const navigate = useNavigate()
    const getData = async () => {
        try {
            await axios.post('/api/admin/get-admin-info-by-id', {},
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('adminKey')
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }
    const getDashBoardData = () => {
        adminRequest({
            url: '/api/admin/dash-bord-data',
            method: 'get',
        }).then((response) => {
            if (response.data.success) {
                setBookingData(response.data.data)
                setArtistData(response.data.artistData)
                setUserData(response.data.userData)
            } else {
                toast('No booking Datas')
            }
        }).catch((err) => {
            toast.error('please login after try again ')
            localStorage.removeItem('adminKey')
            navigate('/admin/login')
        })
    }

    useEffect(() => {
        getData()
        getDashBoardData()
    }, [])
    const data = bookingData?.map(order => ({
        x: new Date(order.orders.timestamp).getTime(),
        y: parseInt(order.orders.amount)
    }));

    const series = [
        {
            name: 'Order Amount',
            data: data
        }
    ];

    const options = {
        chart: {
            type: 'line',
            height: 350
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            title: {
                text: 'Amount'
            }
        }
    };

    return (
        <>
            <Adminlayout />
            <div className="p-4 sm:ml-64">
                <div className="p-4 rounded-lg dark:border-gray-700 mt-14 pb-11">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex flex-col items-center justify-center h-24 rounded bg-blue-400 dark:bg-blue-800">
                            <h1 className="text-2xl text-center h1_tototal_users text-white">TOTAL USERS</h1>
                            <p className="text-2xl 500 text-white">{userData.length}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center h-24 rounded bg-blue-400  dark:bg-gray-800">
                            <h1 className="text-2xl text-center h1_tototal_users text-white">TOTAL ARTISTS</h1>
                            <p className="text-2xl 500 text-white">{artistData.length}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center h-24 rounded bg-blue-400 dark:bg-gray-800">
                            <h1 className="text-2xl text-center h1_tototal_users text-white">TOTAL BOOKINGS</h1>
                            <p className="text-2xl 500 text-white">{bookingData.length}</p>
                        </div>
                    </div>
                    <div class="border-t border-gray-300 my-4 mt-11"></div>
                    <div id="chart" className='pt-11'>
                        <p>Booking Report</p>
                        <ReactApexChart options={options} series={series} type="area" height={350} />
                    </div>
                </div>
            </div >
            <AdminFooter />
        </>
    )
}

export default AdminHome