'use client'

import Form from '@components/Form'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';



const EditPost = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");

    const [post, setPost]= useState({
        title: '',
        description : '',
        id: ''
    })

    useEffect(() => {
        const userJSON = sessionStorage.getItem('user');
        const user = userJSON ? JSON.parse(userJSON) : null;
        if (!user) {
            router.push('/')
        }
        const savedPost = JSON.parse(localStorage.getItem('post'));
        setPost(savedPost);
    }, []);
    
    useEffect(() => {
        console.log(post);
    }, [post]);


    const editPost = async (e) => {
        e.preventDefault()
    
        setSubmitting(true);
    
    
        
        axios
              .put(
                `http://localhost:4000/api/updatepost/${post.id}`, {...post},
                { withCredentials: true }
              )
              .then(() => {
                router.push('/')
              })
              .catch(function(error) {
                  console.error('Edit Post Error:', error);
                  if (error.response && error.response.data.message) {
                      setErrorMessage(error.response.data.message);
                  } else {
                      setErrorMessage('Failed to edit create Post');
                  }
              })
              .finally(() => {
                setSubmitting(false)
              })
      }

  return (
    <div>
        <Form
            type='Edit'
            post={post}
            setpost={setPost}
            submitting={submitting}
            handleSubmit={editPost}
        />
    </div>
  )
}

export default EditPost