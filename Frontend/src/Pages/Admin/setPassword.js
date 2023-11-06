import { Button, Form, Input } from 'antd'
import axios from 'axios'
import React from 'react'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../../Redux/alertSlice'
import { useDispatch } from 'react-redux'
function SetPassword() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onFinish = async (value) => {
        try {
            dispatch(showLoading())
            const response = await axios.post('https://spot-light.website/api/admin/setpassword', value)
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                navigate('/admin/login')
            } else {
                toast(response.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error('server are slow please check latter')
        }

    }
    return (
        <div className='setPasswords' >
            <div className='authentication_form  p-3' >
                <h1 className='title'> Set Password</h1>
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label='Password' name='password' >
                        <Input placeholder='Enter Password' />
                    </Form.Item>
                    <Form.Item label='Confirm Password' name='conPassword'>
                        <Input placeholder='Confirm Password' />
                    </Form.Item>
                    <Button className='primary my-1' htmlType='submit'> Submit</Button>
                    <Link className='anchor' to='/login'> Go to login</Link>
                </Form>
            </div >
        </div >
    )
}

export default SetPassword