import React, { useEffect, useState } from 'react'
import ArtistHeader from '../../componants/artist/artistHeader'
import ReactApexChart from 'react-apexcharts'
import ArtistFooter from '../../componants/artist/artistFooter'
import { request } from '../../axios'
import Chart from 'react-apexcharts';
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../Redux/alertSlice'

function ArtistDashBoard() {
    const [userData, setUserData] = useState([])
    const [artistData, setArtistData] = useState([])
    const [bookingData, setBookingData] = useState([])
    const [graph, setGraph] = useState(true)
    const [seriess, setSeries] = useState([0, 0]);
    const labels = ['Booked', 'Completed'];
    const [optionss, setOptions] = useState({ labels });
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const getData = () => {
        dispatch(showLoading())
        request({
            url: '/api/artist/dashbord-data',
            method: 'get',
        }).then((response) => {
            dispatch(hideLoading())
            if (response.data.success) {
                setBookingData(response.data.data)
                setUserData(response.data.userData)
                setGraph(true)
            } else {
                setGraph(false)
            }
        }).catch((err) => {
            dispatch(hideLoading())
            toast.error('please login after try again')
            localStorage.removeItem('artistKey')
            navigate('/artist/login')
        })
    }

    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        const statusCounts = {
            Booked: 0,
            Completed: 0,
        };

        bookingData.forEach(order => {
            const status = order.orders.status;
            if (status === 'Booked') {
                statusCounts.Booked++;
            } else if (status === 'Completed') {
                statusCounts.Completed++;
            }
        });

        setSeries(prevSeries => [prevSeries[0] + statusCounts.Booked, prevSeries[1] + statusCounts.Completed]);
    }, [bookingData]);

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
            <ArtistHeader />
            <div className="bg-custom-background bg-gray-600 min-h-screen py-8 artist_dashbord_main_div" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <div className='artist-dashbord'>
                    <h1 className="mb-9 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white dashBord_heading">DashBord</h1>
                    <div className=" rounded-lg dark:border-gray-700 mt-5 pb-11">
                        <div className="grid grid-cols-3 gap-4 mb-4 artist_dashbord_totalusers">
                            <div className="flex flex-col items-center justify-center h-24 rounded bg-blue-400 dark:bg-blue-800">
                                <h1 className="text-2xl text-center h1_tototal_users text-white">TOTAL USERS</h1>
                                <p className="text-2xl 500 text-white">{userData?.length}</p>
                            </div>
                            <div className="flex flex-col items-center justify-center h-24 rounded bg-blue-400 dark:bg-gray-800">
                                <h1 className="text-2xl text-center h1_tototal_users text-white">TOTAL BOOKINGS</h1>
                                <p className="text-2xl 500 text-white">{bookingData?.length}</p>
                            </div>
                        </div>
                        <div class="border-t border-gray-300 my-4 mt-11"></div>

                        {graph && < div className='artist_graph_div d-flex'>
                            <div className="donut rount_chart">
                                <p>Booking Detail</p>
                                <Chart options={optionss} series={seriess} type="donut" width="380" />
                            </div>
                            <div class="border-t border-gray-300 my-4 mt-11"></div>
                            <div id="chart" className='pt-11  bookingReportChart'>
                                <p>Booking Report</p>
                                <ReactApexChart options={options} series={series} type="area" height={350} />
                            </div>
                        </div>}


                    </div>
                </div >
            </div >
            <ArtistFooter />
        </>
    )
}

export default ArtistDashBoard