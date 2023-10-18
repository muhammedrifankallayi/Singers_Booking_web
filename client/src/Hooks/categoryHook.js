import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { adminRequest } from '../axios'
import { useNavigate } from 'react-router-dom'

function useCategoryData() {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const [validations, setValidation] = useState({ message: '', status: true })
    const getData = async () => {
        adminRequest({
            url: '/api/admin/get-category-data',
            method: 'get'
        }).then((response) => {
            if (response.data.success) {
                setCategories(response.data.data)
            } else {
                setCategories([])
            }
        }).catch((error) => {
            console.log(error)
            toast.error('plese login after try again')
            localStorage.removeItem('adminKey')
            navigate('/admin/login')
        })
    }
    useEffect(() => {
        getData()
    }, [categories])

    return {
        categories,
        setCategories,
        getData,
        validations,
        setValidation
    }
}

export default useCategoryData