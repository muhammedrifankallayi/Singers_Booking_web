import React, { useEffect, useState } from 'react'
import { userRequest } from '../../axios'
import { toast } from 'react-hot-toast'
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function ArtistPosts({ artist_id }) {
    console.log(artist_id, 'artist_id')
    const [media, setMedia] = useState([])
    const Navigate = useNavigate()
    const getAll = () => {
        userRequest({
            url: '/api/user/all-media',
            method: 'post',
            data: { artist_id: artist_id }
        }).then((response) => {
            if (response.data.success) {
                setMedia(response.data.data)
            }
        }).catch((err) => {
            toast.error('please login after try again')
            localStorage.removeItem('token')
            Navigate('/login')
        })
    }
    useEffect(() => {
        getAll()
    }, [])

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <>
            {media ? (< div style={{ display: 'flex', flexWrap: 'wrap' }
            }>
                {
                    media?.videos
                        ?.reverse()
                        ?.map((videoItem) => {
                            const timeAgo = formatDistanceToNow(new Date(videoItem.createdAt), {
                                addSuffix: true
                            });
                            return (
                                <div key={videoItem._id} style={{ flex: '0 0 33.33%', padding: '10px' }}>
                                    <h2>{truncate(videoItem.name, 60)}</h2>
                                    <video
                                        className="w-full"
                                        // autoPlay
                                        preload="auto"
                                        width="320"
                                        height="240"
                                        controls
                                    >
                                        <source src={`http://localhost:5000${videoItem.video}`} type="video/mp4" />
                                    </video>
                                    <p className="text-xs text-gray-500">{timeAgo}</p>
                                </div>
                            );
                        })}
            </div >) : <div>No posts</div>}
        </>
    )
}

export default ArtistPosts