import React, { useState } from 'react';
import Adminlayout from '../../componants/admin/Adminlayout';
import { toast } from 'react-hot-toast';
import { Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { adminRequest } from '../../axios';
import AdminFooter from '../../componants/admin/adminFooter';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';

function AddBanner() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [validations, setValidataion] = useState({
        message: '',
        status: ''
    })
    const [formData, setFormData] = useState({
        title: '',
        discription: '',
        image: null
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const imageInputOnchange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                image: file
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.title.trim().length === 0) {
            setValidataion({ message: 'space not allowed', status: 'title' })
        } else if (formData.discription.trim().length === 0) {
            setValidataion({ message: 'space not allowed', status: 'dis' })
        } else if (formData.image === null) {
            setValidataion({ message: 'please input insert image', status: 'image' })
        } else {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('discription', formData.discription);
            formDataToSend.append('image', formData.image);
            dispatch(showLoading())
            adminRequest({
                url: '/api/admin/addbanner',
                method: 'post',
                data: formDataToSend
            }).then((response) => {
                dispatch(hideLoading())
                if (response.data.success) {
                    toast('get datas')
                }
            }).catch((err) => {
                dispatch(hideLoading())
                toast('please login after tray again')
                localStorage.removeItem('adminKey')
                navigate('/admin/login')
            })
        }
    }

    return (
        <>
            <Adminlayout />
            <div className="p-11 sm:ml-64 mt-11 banner-div">
                <Link to='/admin/banner'><Button className='back_botton'>Back</Button></Link>
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white banner_heading">Add New Banner</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white banner_label">Heading</label>
                        <input
                            type="text"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Heading"
                            name="title"
                            onChange={handleInputChange}
                            onClick={() => setValidataion({ status: '' })}
                            required
                        />
                        {validations.status === 'title' && <p className="text-red-500">{validations.message} </p>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white banner_label">Your message</label>
                        <textarea
                            id="message"
                            rows="4"
                            name="discription"
                            onClick={() => setValidataion({ status: '' })}
                            onChange={handleInputChange}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your description here..."
                        ></textarea>
                        {validations.status === 'dis' && <p className="text-red-500">{validations.message} </p>}
                    </div>
                    <div className="d-flex items-center justify-center w-full image_div">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white banner_labels" htmlFor="file_input">Upload file</label>
                        <input
                            name="image"
                            onChange={imageInputOnchange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 banner_Image_inupt"
                            id="file_input"
                            type="file"
                        />
                        {validations.status === 'image' && <p className="text-red-500">{validations.message} </p>}

                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 banner_botton"
                    >
                        Submit
                    </button>
                </form >
            </div >
            <AdminFooter />
        </>
    );
}

export default AddBanner;
