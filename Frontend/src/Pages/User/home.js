import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserHeader from '../../componants/user/userHeader'
import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Footer from '../../componants/user/footer';
import 'pure-react-carousel/dist/react-carousel.es.css';
import HomePagePosts from '../../componants/user/homePagePosts';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
function Home() {
    const [banner, setBanner] = useState([])
    const dispatch = useDispatch()
    const getData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post('https://spot-light.website/api/user/get-home-banner-data', {},
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
            dispatch(hideLoading())
            setBanner(response.data.data);
        } catch (error) {
            dispatch(hideLoading())
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <UserHeader />
            <div className='custom-carousel-wrapper'>
                <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showStatus={false}
                    className="custom-responsive-carousel pb-5"
                >
                    {banner.map((element) => (
                        <div className='custom-banner-wrapper' key={element._id}>
                            <>
                                <img src={element.image} alt="Banner" className='custom-banner-image' />
                                <div className="legend">
                                    <h5>{element.title}</h5>
                                    <p>{element.discription}</p>
                                </div>
                            </>
                        </div>
                    ))}
                </Carousel>
            </div>
            {/* <HomePagePosts /> */}
            < Footer />


        </>
    )
}

export default Home  