import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import UserHeader from "../../componants/user/userHeader";
import Footer from "../../componants/user/footer";
import { userRequest } from "../../axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/alertSlice";




const UserProfile = () => {
    const navigate = useNavigate()
    const [profile, setProfile] = useState([])
    const dispatch = useDispatch()
    const getData = () => {
        dispatch(showLoading())
        userRequest({
            url: '/api/user/user_profiledata',
            method: 'post',
        }).then((response) => {
            dispatch(hideLoading())
            if (response.data.data) {
                setProfile(response.data.data)
            } else {

            }
        }).catch((err) => {
            dispatch(hideLoading())
            toast('somthing went wrong')
        })
    }

    useEffect(() => {
        getData()
    }, [])
    const EditProfile = () => {
        try {
            navigate('/editprofile', { state: profile })
        } catch (error) {
            toast.error('somthing went wrong')
        }
    }

    const Bookings = () => {
        try {
            navigate('/bookings')
        } catch (error) {
            toast.error('somthing went wrong please try again')

        }
    }
    return (
        <>
            <UserHeader />
            <div>
                <div >
                    <div
                        style={{
                            backgroundColor: "#fff",
                            textAlign: "center",
                            color: "white",
                            fontSize: "large",
                        }}
                        class="bg-white shadow-md p-4"
                    >


                        <div
                            className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden profile_card_div"
                        >
                            <h2 className="profile_h1">PROFILE</h2>
                            <div className="p-6 profile_div">
                                <div className="flex items-center justify-center profile_image_div">
                                    <img
                                        className="w-20 h-20 rounded-full object-cover object-center border-4 border-blue-500 image_profile"
                                        src={profile.profile}
                                    />
                                </div>
                                <h2 className="mt-4 text-gray-800 text-lg font-semibold text-center profile_name">
                                    {`${profile?.first_name} ${profile?.last_name}`}
                                </h2>
                                <p className="text-gray-600 text-center profile_email_mobile">{profile?.email}</p>
                                <p className="text-gray-600 text-center profile_email_mobile">{profile?.mobile}</p>
                                <div className="mt-6">
                                    <Button className="profile_button"
                                        onClick={() => EditProfile()}
                                        type="primary"
                                        style={{ backgroundColor: "green", marginLeft: "10px" }}
                                        size={10}
                                    >
                                        Edit
                                    </Button>
                                    <Button className="profile_bookings_button"
                                        onClick={() => Bookings()}
                                        type="primary"
                                        style={{ backgroundColor: "green", marginLeft: "10px" }}
                                        size={10}
                                    >
                                        Bookings
                                    </Button>
                                    {/* </Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            < Footer />
        </>
    );
}
export default UserProfile;