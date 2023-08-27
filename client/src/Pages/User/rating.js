
import React, { useState } from 'react'
// import StarRate from '../../componants/user/starRate'
import { FaStar } from 'react-icons/fa'
import UserHeader from '../../componants/user/userHeader'
import Footer from '../../componants/user/footer'
import { userRequest } from '../../axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
function Rating() {
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    const [comant, setComent] = useState('')
    const [title, setTitle] = useState('')
    const location = useLocation()
    const booking_id = location.state
    const navigate = useNavigate()

    const handelSubmit = (e) => {
        e.preventDefault()
        userRequest({
            url: '/api/user/review',
            method: 'post',
            data: {
                booking_id: booking_id,
                comant: comant,
                rating: rating,
                title: title
            }
        }).then((response) => {
            if (response.data.success) {
                toast.success(response.data.message)
                navigate('/')
            } else {
                toast.error(response.data.message)
            }
        }).catch((err) => {
            toast.error('please login after try again')
        })
    }
    return (
        <>
            <UserHeader />
            <div class="min-h-screen py-6 flex flex-col justify-center sm:py-12 review_main_div">
                <div class="py-3 sm:max-w-xl sm:mx-auto">
                    <div class="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
                        <div class="px-12 py-5">
                            <h2 class="text-gray-800 text-3xl font-semibold">Your opinion matters to us!</h2>
                        </div>
                        <div class="bg-gray-200 w-full flex flex-col items-center">
                            <form onSubmit={handelSubmit}>
                                <div class="flex flex-col items-center py-6 space-y-3">
                                    <span class="text-lg text-gray-800">How was of the Artist?</span>
                                    <div style={{ display: 'flex' }}>
                                        {[...Array(5)].map((star, index) => {
                                            const currentRating = index + 1
                                            return (
                                                <label>
                                                    <input
                                                        type='radio'
                                                        name='rating'
                                                        className='star_input'
                                                        value={currentRating}
                                                        onClick={() => {
                                                            setRating(currentRating)
                                                        }}
                                                    />
                                                    < FaStar
                                                        color={currentRating <= (hover || rating) ? '#ffc107' : 'grey'}
                                                        className='star'
                                                        onMouseEnter={() => setHover(currentRating)}
                                                        onMouseLeave={() => setHover(null)}
                                                        key={index} size={50} />
                                                </label>
                                            )
                                        })}
                                    </div >
                                    {/*  */}
                                </div>
                                <div className='title_div'>
                                    <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white rating_lable">Title</label>
                                    <input
                                        type="text"
                                        id="company"
                                        name='title'
                                        onChange={(e) => setTitle(e.target.value)}
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required />
                                </div>
                                <div class="w-4/4 flex flex-col">
                                    <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white rating_lable">Comant</label>

                                    <textarea
                                        rows="3"
                                        className='comant_input'
                                        name='comant'
                                        onChange={(e) => setComent(e.target.value)}
                                        class="p-4 text-gray-500 rounded-xl resize-none"></textarea>
                                    <button
                                        type='submit'
                                        class="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white">Rate now</button>
                                </div>
                            </form>
                        </div>
                        <div class="h-20 flex items-center justify-center">
                            <a href="#" class="text-gray-600">Maybe later</a>
                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}

export default Rating