import React from 'react'
import Adminlayout from '../../componants/admin/Adminlayout'
import { Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import useCategoryData from '../../Hooks/categoryHook'
import AdminFooter from '../../componants/admin/adminFooter'
import { adminRequest } from '../../axios'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../Redux/alertSlice'

function Category() {
    const { categories } = useCategoryData()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const listAndUnlist = async (id, unlist) => {
        if (unlist) {
            dispatch(showLoading())
            adminRequest({
                url: '/api/admin/category-list-unlist',
                method: 'patch',
                data: { id: id }
            }).then((response) => {
                dispatch(hideLoading())
                if (response.data.success) {
                    toast.success(response.data.message)
                }
            }).catch((error) => {
                dispatch(hideLoading())
                toast.error('plese login after try again')
                localStorage.removeItem('adminKey')
                navigate('/admin/login')
            })

        } else {
            dispatch(showLoading())
            adminRequest({
                url: '/api/admin/category-list-unlist',
                method: 'patch',
                data: { id: id, unlist: unlist }
            }).then((response) => {
                dispatch(hideLoading())
                if (response.data.success) {
                    toast.success(response.data.message)
                }
            }).catch((error) => {
                dispatch(hideLoading())
                toast.error('plese login after try again')
                localStorage.removeItem('adminKey')
                navigate('/admin/login')
            })
        }
    }
    return (
        <>
            <Adminlayout />
            <div style={{ paddingLeft: '20%', paddingTop: '10%' }}>
                <Link to='/admin/addcategory' class="mb-2 sm:mb-0 pt-10">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded sm:mr-1 ">
                        Add
                    </button>
                </Link>
                <div class="overflow-x-auto shadow-md sm:rounded-lg">

                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

                        <caption class="p-2 sm:p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                            Our Categories
                        </caption>
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Category name</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((element, index) => (
                                <tr key={element._id}>
                                    <th scope="row">{index + 1}</th>
                                    <th scope="row">{element.name}</th>
                                    {element.status ? (
                                        <th scope="row">Active</th>
                                    ) : (
                                        <th scope="row">Non Active</th>
                                    )}
                                    <td>
                                        {element.status ? (
                                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => listAndUnlist(element._id)}>
                                                List
                                            </button>
                                        ) : (
                                            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => listAndUnlist(element._id, element.status)}>
                                                Unlist
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <AdminFooter />
        </>
    )
}

export default Category