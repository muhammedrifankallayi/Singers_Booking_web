import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { request } from '../../axios';
import { toast } from 'react-hot-toast';
import ArtistHeader from '../../componants/artist/artistHeader';
import ArtistFooter from '../../componants/artist/artistFooter';

function Chats() {
    const [userData, setUserData] = useState([]);

    const location = useLocation();
    const contact = location.state;
    const navigate = useNavigate()
    useEffect(() => {
        if (contact && userData.length === 0) {
            request({
                url: '/api/artist/contact',
                method: 'post',
                data: contact
            }).then((response) => {
                if (response.data.success) {
                    setUserData(response.data.data);
                } else {
                    console.error('API Error:', response.data.error);
                }
            }).catch((error) => {
                toast.error('Please try again later');
                localStorage.removeItem('artistKey')
                navigate('/artist/login')
            });
        }
    }, [contact, userData]);

    const chatUser = (payment_id) => {
        navigate('/artist/personal-chating', { state: payment_id })
    }

    return (

        <>
            <ArtistHeader />
            <div className='main_chats_div'>
                <div className="bg-gray-100 chats-contact">
                    <div className="container mx-auto py-8">
                        <h1 className="text-2xl font-semibold mb-4 text-white">Chats</h1>
                        <ul>
                            {userData.map((user) => (
                                <li key={user._id} className="bg-white p-4 mb-4 rounded-lg shadow cursor-pointer" onClick={() => chatUser(user.payment_id)}>
                                    <div className="sample1">
                                        <div className='sample3'><img src={user.profile} alt="Profile" className="w-12 h-12 rounded-full mr-4" /></div>
                                        <div className='sample' onClick={() => () => chatUser(user.payment_id)}>
                                            <h2 className="text-lg font-semibold">{user.first_name + ' ' + user.last_name}</h2>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div >
            <ArtistFooter />
        </>
    );
}

export default Chats;
