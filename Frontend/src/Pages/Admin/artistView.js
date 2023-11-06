import React, { useEffect, useState } from 'react'
import Adminlayout from '../../componants/admin/Adminlayout'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { adminRequest } from '../../axios'
import AdminFooter from '../../componants/admin/adminFooter'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../Redux/alertSlice'

function ArtistAdminView() {
    const location = useLocation()
    const [moreData, setMoreData] = useState()
    const dispatch = useDispatch()
    const artist_id = location.state
    const getData = async () => {
        try {
            dispatch(showLoading())
            adminRequest({
                url: '/api/admin/get-artist-more-data',
                method: 'post',
                data: {
                    artist_id: artist_id
                }
            }).then((response) => {
                dispatch(hideLoading())
                if (response.data.success) {
                    setMoreData(response.data.data)
                } else {
                    setMoreData([])
                }
            }).catch((err) => {
                dispatch(hideLoading())
                toast('somthing went wrong')
            })
        } catch (error) {
            toast.error('somthing went wrong')
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <Adminlayout />
            <div className="adminArtistView sm:ml-64 ">
                <section className='about'>
                    <div className='main'>
                        <img src={moreData?.image} />

                        <div className='about-text'>
                            <h1>{`${moreData?.lastName}`}</h1>
                            <h5>{moreData?.category}</h5>
                            <p>{moreData?.discription}</p>
                        </div>
                    </div>
                    <h1 className='minBudjet'>{` Booking rate:${moreData?.midBudjet}`}</h1>
                </section >
            </div>
            <AdminFooter />
        </>
    )
}

export default ArtistAdminView