import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import './artistHeader.css'
import { request } from '../../axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { setArtistMore } from '../../Redux/aritsMoreSlice'

const socket = io('https://spot-light.website/');


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function ArtistHeader() {

    const navigate = useNavigate()
    const [count, setCount] = useState(0)
    const [notificaionCount, setNotificationCount] = useState()
    const artistMore = useSelector((state) => state.artistMore.artistMore)
    const dispatch = useDispatch()
    const [active, setActive] = useState(false)
    const [navigation, setNavigation] = useState([
        { name: 'Home', href: '/artist', current: window.location.pathname === '/artist' },
        { name: 'Bookings', href: '/artist/bookings', current: window.location.pathname === '/artist/bookings' },
    ]);
    useEffect(() => {
        request({
            url: '/api/artist/get-notification-data',
            method: 'post'
        }).then((response) => {
            if (response.data.success) {
                setCount(response.data.data.length)
                dispatch(setArtistMore(response.data.profile))
            } else {
                dispatch(setArtistMore(response.data.profile))
                setCount(0)
            }
        }).catch((err) => {
            toast.error('somthing went wrong')
        })

        socket.on('notifications', (data) => {
            const { count, room } = data
            toast.success('You have a notification')
            setNotificationCount(count)
        });

        const token = localStorage.getItem('artistKey');
        const tokenPayload = token ? JSON.parse(atob(token.split('.')[1])) : null;
        const artistId = tokenPayload ? tokenPayload.id : null;
        socket.emit('join', artistId);

        return () => {
            socket.disconnect();
        }

    }, [])
    const signOunt = () => {
        try {
            localStorage.removeItem('artistKey')
            navigate('/artist/login')
        } catch (error) {
            toast.error('somthing went wrong')
        }
    }






    const ChatHistory = () => {
        request({
            url: '/api/artist/chat-historys',
            method: 'get'
        }).then((response) => {
            if (response.data.success) {
                navigate('/artist/chat-history', { state: response.data.chat })
            } else {
                toast('No booking users')
            }
        }).catch((err) => {
            toast.error('please login after try again')
        })
    }
    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-shrink-0 items-center spotLight_logo">
                                <h1 className='user_header_logoHeading'><i className="ri-disc-line"></i>SPOTLIGHT <span className='booking_heading_span'>BOOKING</span></h1>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}

                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute   inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <a href='/artist/notification'><button
                                    type="button"
                                    className="artist-header d-flex relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    <div className='artist_count'>
                                        <h1 >
                                            {notificaionCount ? notificaionCount : count}
                                        </h1>
                                    </div>
                                </button></a>
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>

                                            < img
                                                className="h-8 w-8 rounded-full"
                                                src={artistMore?.image}
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href='/artist/profile'
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Your Profile
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        onClick={() => signOunt()}
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Sign out
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>


                                    </Transition>
                                </Menu>
                                <img
                                    onClick={() => ChatHistory()}
                                    src='https://res.cloudinary.com/dqn0v17b6/image/upload/v1693390565/d3kvykx09rdjo0nf9rmv.png'
                                    className='h-8 w-8 ml-3' />
                            </div>
                        </div>
                    </div>
                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )
            }
        </Disclosure >

    )
}

export default ArtistHeader