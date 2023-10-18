import React, { useEffect, useState } from 'react'
import { userRequest } from '../../axios';
import { toast } from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';



function HomePagePosts() {
    const navigate = useNavigate()
    const [allPost, setAllPost] = useState()
    const getData = () => {
        userRequest({
            url: '/api/user/getAll-post',
            method: 'get'
        }).then((response) => {
            if (response.data.success) {
                setAllPost(response.data.data)
            }
        }).catch((err) => {
            toast.error('please login after try again')
            localStorage.removeItem('token')
            navigate('/login')

        })
    }
    useEffect(() => {
        getData()
    }, [])
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    console.log('this is all posts', allPost)
    return (
        <>
            <div class='max-w-md mx-auto space-y-6'>
                <h2 class="flex flex-row flex-nowrap items-center my-8">
                    <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                    <span class="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                        Letest
                    </span>
                    <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                </h2>
            </div>
            < div style={{ display: 'flex', flexWrap: 'wrap' }} className='post_home_main_div'>
                {allPost
                    ?.reverse()
                    ?.map((videoItem) => {
                        const timeAgo = formatDistanceToNow(new Date(videoItem.videos.createdAt), {
                            addSuffix: true
                        });
                        return (
                            <div key={videoItem._id} style={{ flex: '0 0 25%', padding: '10px' }}>
                                <h2>{truncate(videoItem.videos.name, 60)}</h2>
                                <video
                                    className="w-full"
                                    preload="auto"
                                    width="320"
                                    height="240"
                                    controls
                                >
                                    <source src={`https://spot-light.website/${videoItem.videos.video}`} type="video/mp4" />
                                </video>
                                <p className="text-xs text-gray-500">{timeAgo}</p>
                            </div>
                        );
                    })}
            </div >



        </>

    )
}

export default HomePagePosts