'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'


    const Card = ({post, currentUser}) => {
    const [postId, setPostId] = useState('')

    const router = useRouter()

    useEffect(() => {
        setPostId(post.id)
    }, [post.id])

    const handleDelete = async () => {
        axios
            .delete(
                `http://localhost:4000/api/deletepost/${postId}`, 
                { withCredentials: true }
            )
            .then(response => {
                console.log("Post deleted successfully:", response);
                window.location.reload();
            })
            .catch(error => {
                console.error("Post Deletion Error:", error);
                if (error.response && error.response.data.message) {
                    console.error("Error Message:", error.response.data.message);
                } else {
                    console.error("Deletion failed");
                }
            });

    };

    return (
        <div className='prompt_card mb-5 break-normal mx-auto'>
            <div className='flex justify-between items-start gap-5'>
                <div className='flex-1 flex flex-col justify-start items-start gap-1cursor-pointer break-words'>
                    <h4 className='font-satoshi font-semibold text-gray-900 break-words'>{post.title}</h4>
                    <h3 className='font-inter text-sm text-gray-500 '>By {post.user.username}</h3> 
                </div>
            </div> 
            <p className='my-4 font-satoshi text-sm text-gray-700 break-words'>{post.description}</p>
            {currentUser === post.user.id &&
                    <div className='flex flex-end'>
                        <button 
                        
                            className='p-1 mr-4 text-yellow-400'
                            onClick={() => {
                                localStorage.setItem('post', JSON.stringify(post)),
                                router.push('/EditPost')
                            }}
                        >
                            Edit
                        </button>
                        <button 
                            className='p-1 text-red-600'
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
            }
        </div>
    )
}

export default Card