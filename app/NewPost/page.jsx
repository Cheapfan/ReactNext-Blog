"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Form from '@components/Form';
import { useRouter } from 'next/navigation';

const NewPost = () => {


  const [submitting, setSubmitting] = useState(false)
  const [post, setPost]= useState({
    title: '',
    description : '',
    userid: ''
  })
  const [userId, setUserId] = useState('')
  const router = useRouter()

  
  useEffect(() => {
    const userJSON = sessionStorage.getItem('user');
    const user = userJSON ? JSON.parse(userJSON) : null;
    if (!user) {
      router.push('/')
    }
    else {
      setUserId(user.id)
    }
  })

  const createPost = async (e) => {
    e.preventDefault()

    setSubmitting(true);

    const postWithUserId = {
      ...post,
      userid: userId
    };

    
    axios
          .post(
            `http://localhost:4000/api/post`, {...postWithUserId},
            { withCredentials: true }
          )
          .then(() => {
            router.push('/')
          })
          .catch(function(error) {
              console.error("Create Post Error:", error);
              if (error.response && error.response.data.message) {
                  setErrorMessage(error.response.data.message);
              } else {
                  setErrorMessage('Failed to create Post');
              }
          })
          .finally(() => {
            setSubmitting(false)
          })
  }

    return (
      <div>
        <Form
          type='Create'
          post={post}
          setpost={setPost}
          submitting={submitting}
          handleSubmit={createPost}
        > 
        </Form>
      </div>
    )
}


export default NewPost