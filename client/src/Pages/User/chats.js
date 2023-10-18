import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { request, userRequest } from '../../axios';
import { toast } from 'react-hot-toast';
import ArtistHeader from '../../componants/artist/artistHeader';
import ArtistFooter from '../../componants/artist/artistFooter';
import Footer from '../../componants/user/footer';
import UserHeader from '../../componants/user/userHeader';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';

function UserChats() {
    const [userData, setUserData] = useState([]);
    const dispatch = useDispatch()
    const location = useLocation();
    const contact = location.state;
    const navigate = useNavigate()
    useEffect(() => {
        if (contact && userData.length === 0) {
            dispatch(showLoading())
            userRequest({
                url: '/api/user/contact',
                method: 'post',
                data: contact
            }).then((response) => {
                dispatch(hideLoading())
                if (response.data.success) {
                    setUserData(response.data.data);
                } else {
                    console.error('API Error:', response.data.error);
                }
            }).catch((error) => {
                dispatch(hideLoading())
                console.error('API Error:', error);
                toast.error('Please try again later');
            });
        }
    }, [contact, userData]);

    const chatUser = (payment_id) => {
        navigate('/personal-chating', { state: payment_id })
    }

    return (
        <>
            <UserHeader />
            <div className='main_chats_div'>
                <div className=" chats-contact" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    {/* <div className="container mx-auto py-8">
                        <h1 className="text-2xl font-semibold mb-4 text-white">Chats</h1>
                        <ul>
                            {
                                userData.map((user) => (
                                    <li key={user._id} className="bg-white p-4 mb-4 rounded-lg shadow" onClick={() => chatUser(user.payment_id)}>
                                        <div className="flex items-start">
                                            <img src={user.image} alt="Profile" className="w-12 h-12 rounded-full mr-4" />
                                            <div onClick={() => () => chatUser(user.payment_id)}>
                                                <h2 className="text-lg font-semibold">{user.firstName + ' ' + user.lastName}</h2>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div> */}
                    <div className="container mx-auto py-8">
                        <h1 className="text-2xl font-semibold mb-4 text-white">Chats</h1>
                        <ul className="">
                            {userData.map((user) => (
                                <li key={user._id} className="bg-white p-4 mb-4 rounded-lg shadow cursor-pointer" onClick={() => chatUser(user.payment_id)}>
                                    <div className="sample1">
                                        <div className='sample3'><img src={user.image} alt="Profile" className="w-12 h-12 rounded-full mr-4" /></div>
                                        <div className='sample' onClick={() => chatUser(user.payment_id)}>
                                            <h2 className="text-lg font-semibold">{user.firstName + ' ' + user.lastName}</h2>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div >
            <Footer />
        </>
    );
}

export default UserChats;
