import React, { useEffect, useState } from 'react';
import UserHeader from '../../componants/user/userHeader';
import Footer from '../../componants/user/footer';
import io from 'socket.io-client'
import { useLocation, useNavigate } from 'react-router-dom';
import { userRequest } from '../../axios';
import { toast } from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
const socket = io('https://spot-light.website/');

function PersonalChating() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [reciveSender, setSender] = useState('')
    const [profile, setProfile] = useState('')
    const [partnerProfile, setPartnerProfile] = useState('')
    const [history, setHistory] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const id = location.state
    const dispatch = useDispatch()
    const getUserData = () => {
        dispatch(showLoading())
        userRequest({
            url: '/api/user/get-user-info-by-id',
            method: 'post'
        }).then((response) => {
            dispatch(hideLoading())
            if (response.data.success) {
                setSender(response.data.data.id)
                setProfile(response.data.data.profile)
            } else {
                setSender('')
            }
        }).catch((err) => {
            dispatch(hideLoading())
            toast.error('please login after try again')
            localStorage.removeItem('token')
            navigate('/login')

        })
    }
    const getPartnerData = () => {
        dispatch(showLoading())
        userRequest({
            url: '/api/user/partner-data',
            method: 'post',
            data: { id: id }
        }).then((response) => {
            dispatch(hideLoading())
            if (response.data.success) {
                setPartnerProfile(response.data.data[0])
            } else {
                setPartnerProfile({})
            }
        }).catch((err) => {
            dispatch(hideLoading())
            toast.error('please login after try again')
            localStorage.removeItem('token')
            navigate('/login')
        })
    }

    function getChatHistory() {
        dispatch(showLoading())
        userRequest({
            url: '/api/user/chat-history',
            method: 'post',
            data: { id: id }
        }).then((response) => {
            dispatch(hideLoading())
            if (response.data.success) {
                setHistory(response.data.chatData)
                history.map((items) => {
                    if (items.history.sender_id === response.data.userId) {
                        setMessages((prevMessages) => [...prevMessages, { message: items.history.chat, sender: response.data.userId, time: items?.history.time }]);
                    } else {
                        setMessages((prevMessages) => [...prevMessages, { text: items.history.chat, sender: response.data.userId, time: items?.history.time }]);
                    }
                })
            } else {
                toast('false')
            }
        }).catch((error) => {
            dispatch(hideLoading())
            toast.error('please login after try again')
            localStorage.removeItem('token')
            navigate('/login')
        })
    }

    useEffect(() => {
        getChatHistory()
        getUserData()
        getPartnerData()
        socket.on('message', (data) => {
            const { room, text, sender } = data;
            if (room === id && sender !== reciveSender) {
                setMessages((prevMessages) => [...prevMessages, { text, sender, time: new Date() }]);
            }
        });
        socket.emit('join', id);
        return () => {
            socket.off('message');
            socket.emit('leave', id);
        };
    }, [id, reciveSender]);

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            socket.emit('message', { room: id, text: message, sender: reciveSender });
            setMessages((prevMessages) => [...prevMessages, { message, time: new Date() }])
            setMessage('');
        }
    };
    return (
        <>
            <UserHeader />
            <div class="flex-1 p:2 sm:p-6 justify-between flex flex-col msg_divs">
                <div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                    <div class="relative flex items-center space-x-4">
                        <div class="relative">
                            <span class="absolute text-green-500 right-0 bottom-0">
                                <svg width="20" height="20">
                                    <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                                </svg>
                            </span>
                            <img src={`${partnerProfile?.orders?.image}?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144`} alt="" class="w-10 sm:w-16 h-10 sm:h-16 rounded-full" />
                        </div>
                        <div class="flex flex-col leading-tight">
                            <div class="text-2xl mt-1 flex items-center">
                                <span class="text-gray-700 mr-3">{partnerProfile?.orders?.artist}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="messages" class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                    {messages?.map((items) => {
                        if (items?.text) {
                            const timeAgo = formatDistanceToNow(new Date(items?.time), {
                                addSuffix: true,
                            });
                            return < div className="chat-message" >
                                <div className="flex items-end">
                                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                        <div >
                                            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                                {items?.text}
                                            </span>
                                            <p>{timeAgo}</p>
                                        </div>
                                    </div>
                                    {items?.text && < img
                                        src={`${partnerProfile?.orders?.image}? ixlib = rb - 1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144`}
                                        alt="My profile"
                                        className="w-6 h-6 rounded-full order-1"
                                    />}
                                </div>
                            </div>
                        } else {
                            const timeAgos = formatDistanceToNow(new Date(items?.time), {
                                addSuffix: true,
                            });
                            return < div class="chat-message" >
                                <div class="flex items-end justify-end">
                                    <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">

                                        <div >
                                            <span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                                                {items?.message}
                                            </span>
                                            <p>{timeAgos}</p>
                                        </div>

                                    </div>
                                    {items?.message && < img src={`${profile}? ixlib = rb - 1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144`} alt="My profile" class="w-6 h-6 rounded-full order-2" />}
                                </div>
                            </div>
                        }
                    })}
                </div>
                <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                    <div class="relative flex">
                        <span class="absolute inset-y-0 flex items-center">
                        </span>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write your message!"
                            class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                        />
                        <div class="absolute right-0 items-center inset-y-0 ">
                            <button type="button"
                                onClick={handleSendMessage}
                                class="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none send_btn">
                                <span class="font-bold">Send</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 ml-2 transform rotate-90">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div >
            <Footer />

        </>
    );
}

export default PersonalChating;
