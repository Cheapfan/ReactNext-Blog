'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Login = () => {

    
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
    
  const [submitting, setSubmitting] = useState(false)

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };

      const router = useRouter();
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true)
        
        setErrorEmail('')
        setErrorPassword('')
        setErrorMessage('')

        if(!formData.email || !formData.password) {
            setErrorMessage('All field must be filled!')
            return;
        }

        console.log(formData);


        axios
          .post(
            `http://localhost:4000/api/login`, {...formData},
            { withCredentials: true }
          )
          .then(function(response) {
              sessionStorage.setItem("user", JSON.stringify(response?.data?.user));
              const event = new Event('sessionChanged');
              window.dispatchEvent(event);
              router.push('/')
          })
          .catch(function(error) {
              console.error("Login Error:", error);
              if (error.response && error.response.data.message) {
                  setErrorMessage(error.response.data.message);
              } else {
                  setErrorMessage('Login failed');
              }
          })
          .finally(() => {
            setSubmitting(false)
          })

      };

  return (
    <div className=''>
            <h1 className='head_text text-center mb-10'>
                Blog
                <br className='max-md:hidden'></br>
                <span className='orange_gradient text-center'>Login</span>
            </h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-10' >
                    <div className='mb-2'>
                        <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Email'
                        className='w-full p-2 border rounded-md'
                        />
                    </div>
                    <div className='mb-2'>
                        <input
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Password'
                        className='w-full p-2 border rounded-md'
                        />
                    </div>
                    <p className="text-red-500">{errorMessage}</p>
                </div>
                <button 
                    type='submit' 
                    className='black_btn w-full'
                    disabled={submitting}
                >
                    Login
                </button>
            </form>
            <button 
                className='flex-end mt-3 text-blue-600'
                onClick={() => {router.push('/Register')}}
            >
                Register here
            </button>
        </div>
  )
}

export default Login