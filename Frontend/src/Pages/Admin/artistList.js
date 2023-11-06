import React, { useEffect, useState } from 'react'
import Adminlayout from '../../componants/admin/Adminlayout'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { setArtist } from '../../Redux/artistSlice'
import { Button } from 'antd'
import AdminFooter from '../../componants/admin/adminFooter'
import { adminRequest } from '../../axios'
import { hideLoading, showLoading } from '../../Redux/alertSlice'

function ArtistList() {
    const [search, setSearch] = useState("")
    const dispatch = useDispatch()
    const artist = useSelector((state) => state.artist.artist)
    const Navigate = useNavigate()
    const getData = async () => {
        dispatch(showLoading())
        adminRequest({
            url: '/api/admin/get-artist-data',
            method: 'get'
        }).then((response) => {
            dispatch(hideLoading())
            if (response.data.success) {
                dispatch(setArtist(response.data.data))
            } else {
                toast(response.data.message)
            }
        }).catch((error) => {
            dispatch(hideLoading())
            toast.error('plese login after try again')
            localStorage.removeItem('adminKey')
            Navigate('/admin/login')
        })
    }

    useEffect(() => {
        getData()
    }, [])
    const blockArtist = async (id, email) => {
        try {
            if (email) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to Unblock this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Block it!'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        dispatch(showLoading())
                        adminRequest({
                            url: '/api/admin/block-and-unblock-artist',
                            method: 'patch',
                            data: { id: id, email: email }
                        }).then((response) => {
                            dispatch(hideLoading())
                            if (response.data.success) {
                                toast.success(response.data.message)
                                dispatch(setArtist(response.data.data))
                                Swal.fire(
                                    'Unblocked!',
                                    'Artist has been Unblocked.',
                                    'success'
                                )
                            } else {
                                toast(response.data.message)
                            }
                        }).catch((error) => {
                            dispatch(hideLoading())
                            toast.error('please login after try again')
                            localStorage.removeItem('adminKey')
                            Navigate('/admin/login')
                        })
                    }
                })
            } else {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to Block this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Block it!'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        dispatch(showLoading())
                        adminRequest({
                            url: '/api/admin/block-and-unblock-artist',
                            method: 'patch',
                            data: { id: id }
                        }).then((response) => {
                            dispatch(hideLoading())
                            if (response.data.success) {
                                toast.success(response.data.message)
                                dispatch(setArtist(response.data.data))
                                Swal.fire(
                                    'Blocked!',
                                    'Artist has been Blocked.',
                                    'success'
                                )
                            } else {
                                toast(response.data.message)
                            }
                        }).catch((error) => {
                            dispatch(hideLoading())
                            toast.error('plase login after try again')
                            localStorage.removeItem('adminKey')
                            Navigate('/admin/login')
                        })

                    }
                })
            }
        } catch (error) {
            toast.error('somthing went wrong')
        }
    }
    const goArtistViewPage = async (artist_id) => {
        try {
            Navigate('/admin/artistdetails', { state: artist_id })
        } catch (error) {
            toast('somthing went wrong')
        }
    }

    return (
        <>
            <Adminlayout />
            <div className="p-5 sm:ml-64 ">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-11">
                    <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
                        <label htmlFor="table-search" className="sr-only ml-2">Search</label>
                        <div className="relative ml-4">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text"
                                id="table-search-users"
                                onChange={(e) => setSearch(e.target.value)}
                                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search htmlFor users" />
                        </div>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4">
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Full name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Mobile
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    View
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {artist.filter((artists) => {
                                return search && search.toLowerCase() === "" ? artists : artists.firstName.toLowerCase().includes(search.toLowerCase())
                            }).map((element, index) => {
                                return < tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={element._id}>
                                    <td className="w-4 p-4">
                                    </td>
                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                        {element.firstName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {element.mobile}
                                    </td>
                                    <td className="px-6 py-4">
                                        {element.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {element.otp === 'isVerified' ? 'isVerified' && (
                                            <div className="flex items-center">
                                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>Online
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>Block
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            {element.otp === 'isVerified' ? 'isVerified' && (
                                                <Link to=""
                                                    className="font-medium text-red-600 dark:text-red-500 hover:text-orange-600 hover:font-bold"
                                                    onClick={() => {
                                                        blockArtist(element._id)
                                                    }}
                                                >Block</Link>
                                            ) : (
                                                < Link to=""
                                                    className="font-medium text-green-600 dark:text-blue-500 hover:text-green-600 hover:font-bold"
                                                    onClick={() => {
                                                        blockArtist(element._id, element.email)
                                                    }}
                                                > unblock</Link>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 mr-5">
                                        <Button className='primary my-1 artist_view' htmlType='submit' onClick={() => goArtistViewPage(element._id)}>
                                            view
                                        </Button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div >
            <AdminFooter />
        </>
    )
}

export default ArtistList