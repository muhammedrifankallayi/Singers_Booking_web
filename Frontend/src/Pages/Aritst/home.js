import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ArtistHeader from '../../componants/artist/artistHeader'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { setArtistMore } from '../../Redux/aritsMoreSlice';
import ArtistFooter from '../../componants/artist/artistFooter';
import { hideLoading, showLoading } from '../../Redux/alertSlice';

function ArtistHome() {
    const [banner, setBanner] = useState([])
    const dispatch = useDispatch()
    const getData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post('https://spot-light.website/api/artist/get-artisthome-banner-data', {},
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('artistKey')
                    }
                })
            dispatch(hideLoading())
            setBanner(response.data.data)
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <ArtistHeader />
            <div className='artist_home_carosel_div'>
                <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showStatus={false}
                    className='custom-responsive-carousel'
                >
                    {banner.map((element) => {

                        return (
                            < div className='custom-banner-wrapper'>
                                <>
                                    < img src={element.image} alt="Motorbike Smoke" className='custom-banner-image' />
                                    <div className="legend">
                                        <h5>{element.title}</h5>
                                        <p>{element.discription}</p>
                                    </div>
                                </>
                            </div >)
                    })
                    }
                </Carousel >
            </div>
            <ArtistFooter />
        </>
    )
}

export default ArtistHome