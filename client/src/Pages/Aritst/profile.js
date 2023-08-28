import React, { useEffect, useState } from 'react'
import ArtistHeader from '../../componants/artist/artistHeader'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import ArtistFooter from '../../componants/artist/artistFooter'
import { toast } from 'react-hot-toast'
import { request } from '../../axios'
import { formatDistanceToNow } from 'date-fns';
function Profile() {
    const [profile, setProfile] = useState([])
    const [personal, setPersonal] = useState([])
    const [media, setMedia] = useState([])
    const navigate = useNavigate()
    const [rating, setRating] = useState([])
    const initialReviewsToShow = 2
    const [visibleReviews, setVisibleReviews] = useState(initialReviewsToShow);
    const [showAllRatings, setShowAllRatings] = useState(false);
    const getData = () => {
        try {
            request({
                url: '/api/artist/get-profile-data',
                method: 'post',
            }).then((response) => {
                if (response.data.success) {
                    setProfile(response.data.data)
                    setPersonal(response.data.personal)
                    setMedia(response.data.mediaData)
                    setRating(response.data.reviewData)
                } else {
                    toast('Add your More Details')
                    setPersonal(response.data.personal)
                }
            }).catch((err) => {
                localStorage.removeItem('artistKey')
                navigate('/login')
            })
        } catch (error) {
            toast.error('somthing went wrong')
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const EditProfile = async (req, res) => {
        try {
            navigate('/artist/edit-profile', { state: profile })
        } catch (error) {

        }
    }
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    const handleShowMore = () => {
        setShowAllRatings(true);
        setVisibleReviews(rating.reviews?.length);
    };
    const handelShowLess = () => {
        setShowAllRatings(false);
        setVisibleReviews(initialReviewsToShow)
    }
    return (
        <>
            <ArtistHeader />
            <div class="h-full bg-gray-200 p-8">
                <div class="bg-white rounded-lg shadow-xl pb-8">
                    <div class="w-full h-[250px]">
                        <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" class="w-full h-full rounded-tl-lg rounded-tr-lg" />
                    </div>
                    <div class="flex flex-col items-center -mt-20">
                        {profile?.midBudjet !== undefined ?
                            (<img src={profile?.image} class="w-40 border-4 border-white rounded-full" />)
                            :
                            (< img src='https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' class="w-40 border-4 border-white rounded-full" />)}
                        <div class="flex items-center space-x-2 mt-2">
                            <p class="text-2xl">{personal?.firstName + ' ' + personal?.lastName}</p>
                            <span class="bg-blue-500 rounded-full p-1" title="Verified">
                                <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </span>
                        </div>
                        <p class="text-gray-700">{profile?.category}</p>
                        <p class="text-sm text-gray-500">{personal?.email}</p>
                    </div>
                    {media?.length > 0 && < div className='post_container_div'>
                        <p class="text-2xl post_container">posts</p>
                        <div className='post_count'>
                            <p class="text-2xl count">{media?.length}</p>
                        </div>
                    </div>}
                    <div class="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
                        <div class="flex items-center space-x-4 mt-2">
                            {!profile?.midBudjet && < a href='/artist/artistdetailsform'>  <button
                                class="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                Add
                            </button></a>}
                            {profile?.midBudjet && (<>< button
                                onClick={() => EditProfile()}
                                class="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                <span>Edit</span>
                            </button>
                                <button
                                    onClick={() => navigate('/artist/upload-post')}
                                    class="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                    <span>Upload Post</span>
                                </button></>)
                            }
                        </div>
                    </div>
                </div >

                {profile?.midBudjet && <div class="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                    <div class="w-full flex flex-col 2xl:w-1/3">
                        <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <h4 class="text-xl text-gray-900 font-bold">Personal Info</h4>
                            <ul class="mt-2 text-gray-700">
                                <li class="flex border-y py-2">
                                    <span class="font-bold w-24">Full name:</span>
                                    <span class="text-gray-700">{personal?.firstName + ' ' + personal?.lastName}</span>
                                </li>
                                <li class="flex border-b py-2">
                                    <span class="font-bold w-24">Category:</span>
                                    <span class="text-gray-700">{profile?.category}</span>
                                </li>
                                <li class="flex border-b py-2">
                                    <span class="font-bold w-24">Mobile:</span>
                                    <span class="text-gray-700">{personal?.mobile}</span>
                                </li>
                                <li class="flex border-b py-2">
                                    <span class="font-bold w-24">Email:</span>
                                    <span class="text-gray-700">{personal?.email}</span>
                                </li>
                                <li class="flex border-b py-2">
                                    <span class="font-bold w-24">Amount:</span>
                                    <span class="text-gray-700">{profile?.midBudjet}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="flex flex-col w-full 2xl:w-2/3">
                        <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <h4 class="text-xl text-gray-900 font-bold">About</h4>
                            <p class="mt-2 text-gray-700">{profile?.discription}</p>
                        </div>
                    </div>
                </div>
                }
                {media?.length > 0 &&
                    <div class="bg-white rounded-lg shadow-xl p-8">
                        <div class="flex items-center justify-between">
                            <h4 class="text-xl text-gray-900 font-bold">Posts ({media?.length})</h4>
                        </div>


                        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-8 mt-8">


                            {
                                media
                                    ?.reverse()
                                    ?.map((videoItem) => {
                                        const timeAgo = formatDistanceToNow(new Date(videoItem.createdAt), {
                                            addSuffix: true
                                        });
                                        return (
                                            <a class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600" title="View Profile">
                                                <div key={videoItem._id} >
                                                    <h2>{truncate(videoItem.videos.name, 60)}</h2>
                                                    <video
                                                        className="w-full"
                                                        // autoPlay
                                                        preload="auto"
                                                        width="320"
                                                        height="240"
                                                        controls
                                                    >
                                                        <source src={`http://localhost:5000${videoItem.videos.video}`} type="video/mp4" />
                                                    </video>
                                                    <p className="text-xs text-gray-500">{timeAgo}</p>
                                                </div>

                                            </a>
                                        );
                                    })}
                        </div>
                    </div>}

                {rating && < div class="bg-white rounded-lg shadow-xl p-8">
                    <h1 className="text-2xl pb-3">Ratings</h1>
                    <div class="flex items-center">
                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <p class="ml-2 text-sm font-bold text-gray-900 dark:text-white">{rating?.average}</p>
                        <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                        <a href="#" class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">{rating?.reviews?.length} reviews</a>
                    </div>
                    < div className="mt-6" >
                        <div className="bg-gray-50 rounded-lg shadow-md p-4">
                            <div className="mt-4 flex items-center reviews_in_artist_view_page">
                                {rating?.reviews?.slice(0, showAllRatings ? rating?.reviews.length : visibleReviews)?.map((items) => {
                                    const timeAgo = formatDistanceToNow(new Date(items.timestamp), {
                                        addSuffix: true,
                                    });
                                    return (<>
                                        <article className='mt-4 mb-4'>
                                            < div class="flex  items-center mb-4 space-x-4" >
                                                <img class="w-10 h-10 rounded-full" src={items?.userImage} alt="" />
                                                <div class="space-y-1 font-medium dark:text-white">
                                                    <p>{items?.userName} </p>
                                                </div>
                                            </div>

                                            {items?.starRating === 1 && < div class="flex items-center mb-1">
                                                <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <svg class="w-4 h-4 text-gray-300 dark:text-gray-500 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <svg class="w-4 h-4 text-gray-300 dark:text-gray-500 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <svg class="w-4 h-4 text-gray-300 dark:text-gray-500 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <svg class="w-4 h-4 text-gray-300 dark:text-gray-500 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <h3 class="ml-2 text-sm font-semibold text-gray-900 dark:text-white">{items.title}</h3>
                                            </div>}

                                            {items?.starRating === 2 && < div class="flex items-center mb-1">
                                                <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <svg class="w-4 h-4 text-gray-300 dark:text-gray-500 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <svg class="w-4 h-4 text-gray-300 dark:text-gray-500 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <svg class="w-4 h-4 text-gray-300 dark:text-gray-500 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <h3 class="ml-2 text-sm font-semibold text-gray-900 dark:text-white">{items.title}</h3>
                                            </div>}

                                            {items?.starRating === 3 && < div class="flex items-center mb-1">
                                                <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <svg class="w-4 h-4 text-gray-300 dark:text-gray-500 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <svg class="w-4 h-4 text-gray-300 dark:text-gray-500 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <h3 class="ml-2 text-sm font-semibold text-gray-900 dark:text-white">{items.title}</h3>
                                            </div>}

                                            {items?.starRating === 4 && < div class="flex items-center mb-1">
                                                <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <svg class="w-4 h-4 text-gray-300 dark:text-gray-500 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <h3 class="ml-2 text-sm font-semibold text-gray-900 dark:text-white">{items.title}</h3>
                                            </div>}
                                            <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400"><p>Reviewed in <time datetime="2017-03-03 19:00">{timeAgo}</time></p></footer>
                                            <p class="mb-2 text-gray-500 dark:text-gray-400">{items.review}</p>
                                            <hr />
                                        </article >
                                    </>)
                                })}
                            </div >
                        </div>
                    </div >
                    <div class="max-w-md mx-auto p-4 flex justify-center">
                        {rating?.reviews?.length > initialReviewsToShow && !showAllRatings && (<button
                            id="showMoreBtn"
                            onClick={handleShowMore}
                            class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">
                            Show More
                        </button>)}
                    </div>
                    <div class="max-w-md mx-auto p-4 flex justify-center">
                        {rating?.reviews?.length > initialReviewsToShow && showAllRatings && (<button
                            id="showMoreBtn"
                            onClick={handelShowLess}
                            class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">
                            Hide
                        </button>)}
                    </div>
                </div>}
            </div >
            <ArtistFooter />
        </>
    )
}

export default Profile