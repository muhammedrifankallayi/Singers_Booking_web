import React from 'react';
import GusetHeader from '../publicAndProtect/gusetHeader';

const GuestPage = () => {
    return (<>
        <GusetHeader />
        <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gradient-to-br gust_main_div">
            <div className="md:w-1/2 p-8">
                <h1 className="text-4xl font-bold text-white mb-4">Welcome to the Spotlight Booking</h1>
                <p className="text-white text-lg mb-8">
                    Discover a world of artistic talent on our platform. From mesmerizing dancers and soulful singers to virtuoso musicians and dynamic bands, we connect you with skilled performers for your events and projects. Experience the magic of live entertainment as you book top-tier artists, making your occasions truly unforgettable.
                </p>
            </div>
            <div className="md:w-1/2 p-8 flex flex-col space-y-4">
                <a href="/login" className="naivgation_bottons text-black-500 text-2xl hover:text-white px-6 py-3 rounded-lg shadow-md transition">
                    I am User
                </a>
                <a href="/artist/login" className="naivgation_bottons text-black-500 text-2xl hover:text-white px-6 py-3 rounded-lg shadow-md transition">
                    I am  Artist
                </a>
            </div>
        </div>
    </>
    );
};

export default GuestPage;
