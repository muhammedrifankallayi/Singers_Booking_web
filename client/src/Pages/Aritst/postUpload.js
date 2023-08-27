import React, { useState } from 'react';
import { Button } from 'antd';
import { request } from '../../axios';
import { toast } from 'react-hot-toast';
import ArtistHeader from '../../componants/artist/artistHeader';
import ArtistFooter from '../../componants/artist/artistFooter';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';


function PostUpload() {
    const dispatch = useDispatch()
    const [name, setName] = useState('');
    const [videos, setVideos] = useState(null);
    const [validation, setValidation] = useState({
        message: '',
        status: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        for (let key in videos) {
            formData.append('videos', videos[key]);
        }
        formData.append('name', name);
        console.log('formData', videos)
        if (name.trim().length === 0) {
            setValidation({ message: 'Space not allowed', status: 'name' })
            toast('please enter name of the video')
        } else if (videos === null) {
            setValidation({ message: 'please upload videos', status: 'upload' })
            toast('please select a image')
        } else {
            dispatch(showLoading())
            request({
                url: '/api/artist/create-media',
                method: 'post',
                data: formData,
            })
                .then((response) => {
                    dispatch(hideLoading())
                    if (response.data.success) {
                        toast.success('Upload successful');
                    } else {
                        toast.error('Upload failed');
                    }
                })
                .catch((error) => {
                    dispatch(hideLoading())
                    toast.error('Upload failed: ' + error.message);
                });
        }
    };
    return (
        <>
            <ArtistHeader />
            <div className='upload_form_div_main'>
                <div className='upload_form_div flex justify-center items-center'>
                    <form onSubmit={handleSubmit} className='w-full max-w-md'>
                        <div class="mb-6">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white postUpload-lable ">Your Video name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                onClick={() => setValidation({ status: '' })}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name of the video"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            {validation.status === 'name' && <p className="text-red-600">{validation.message} </p >}
                        </div>
                        <div class="mb-6">
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white postUpload-lable ">Upload your video</label>
                            <input
                                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                type="file"
                                name="videos"
                                id="videos"
                                multiple
                                onClick={() => setValidation({ status: '' })}
                                accept=".mp4, .mkv"
                                onChange={(e) => setVideos(e.target.files)}
                            />
                            {validation.status === 'upload' && <p className="text-red-600 ">{validation.message} </p >}
                        </div>
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>
            <ArtistFooter />
        </>
    );
}

export default PostUpload;
