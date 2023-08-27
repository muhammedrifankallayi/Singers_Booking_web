import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserHeader from '../../componants/user/userHeader'
import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Footer from '../../componants/user/footer';
import 'pure-react-carousel/dist/react-carousel.es.css';
import HomePagePosts from '../../componants/user/homePagePosts';
function Home() {
    const [banner, setBanner] = useState([])
    const getData = async () => {
        try {
            const response = await axios.post('/api/user/get-home-banner-data', {},
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
            setBanner(response.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <UserHeader />
            {/* <div className='artist_home_carosel_div'>
                <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showStatus={false}
                    className="responsive-carousel"
                >
                    {banner.map((element) => {
                        return (
                            < div className='bannershow_div' key={element._id}>
                                <>
                                    < img src={element.image} alt="Motorbike Smoke" className='banner_image' />
                                    <div className="legend">
                                        <h5>{element.title}</h5>
                                        <p>{element.discription}</p>
                                    </div>
                                </>
                            </div >)
                    })
                    }
                </Carousel >
            </div > */}

            {/*  edited*/}

            <div className='custom-carousel-wrapper'>
                <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showStatus={false}
                    className="custom-responsive-carousel"
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

            {/* edited */}
            <HomePagePosts />
            < Footer />


        </>
    )
}

export default Home  