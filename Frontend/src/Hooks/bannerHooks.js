import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { adminRequest } from '../axios'

function useBannerData() {
    const [banners, setBanners] = useState([])
    const navigate = useNavigate()
    const getData = async () => {
        adminRequest({
            url: '/api/admin/get-banner-data',
            method: 'get'
        }).then((response) => {
            if (response.data.success) {
                setBanners(response.data.data)
            } else {
                setBanners([])
            }
        }).catch((error) => {
            toast.error('plese login after try again')
            localStorage.removeItem('adminKey')
            navigate('/admin/login')
        })
    }
    useEffect(() => {
        getData()
    }, [banners])

    return {
        banners,
    }
}

export default useBannerData