'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Register = () => {
    
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      const [errorUsername, setErrorUsername] = useState('');
      const [errorEmail, setErrorEmail] = useState('');
      const [errorPassword, setErrorPassword] = useState('');
      const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
      const [errorMessage, setErrorMessage] = useState('');
      const [submitting, setSubmitting] = useState(false);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };

      const router = useRouter();
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        setSubmitting(true)

        setErrorUsername('')
        setErrorEmail('')
        setErrorPassword('')
        setErrorConfirmPassword('')
        setErrorMessage('')
        
        let isRegisterValidated = true

        if(!formData.username) {
            setErrorUsername('Username must be filled!')
            isRegisterValidated = false
        }

        if(!formData.email) {
            setErrorEmail('Email must be filled!')
            isRegisterValidated = false
        }
        else if(!/[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}/.test(formData.email)) {
            setErrorEmail('Must have @ and .')
            isRegisterValidated = false
        }

        if(!formData.password) {
            setErrorPassword('Password must be filled!')
            isRegisterValidated = false
        }
        else if(formData.password.length < 8) {
            setErrorPassword('Cant be less than 8 characters!')
            isRegisterValidated = false
        }

        if(!formData.confirmPassword) {
            setErrorConfirmPassword('Confirm password must be filled!')
            isRegisterValidated = false
        }
        else if(formData.password != formData.confirmPassword) {
            setErrorConfirmPassword('Must me the same as password!')
            isRegisterValidated = false
        }

        console.log(formData);

        if (isRegisterValidated == false) {
            return;
        }

        axios
            .post(`http://localhost:4000/api/register`, {...formData})
            .then(function(response) {
                // localStorage.setItem("user", JSON.stringify(response.data.user));
                router.push('/Login')
            })
            .catch(function(error) {
                console.error("Registration Error:", error);
                if (error.response && error.response.data.message) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('Registration failed');
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
                <span className='orange_gradient text-center'>Register</span>
            </h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-10' >
                    <div className='mb-2'>
                        <input
                        type='text'
                        id='username'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                        placeholder='Username'
                        className='w-full p-2 border rounded-md'
                        />
                        <p className="text-red-500">{errorUsername}</p>
                    </div>
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
                        <p className="text-red-500">{errorEmail}</p>
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
                        <p className="text-red-500">{errorPassword}</p>
                    </div>
                    <div className='mb-2'>
                        <input
                        type='password'
                        id='confirm-password'
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder='Confirm Password'
                        className='w-full p-2 border rounded-md'
                        />
                        <p className="text-red-500">{errorConfirmPassword}</p>
                    </div>
                    <p className="text-red-500">{errorMessage}</p>
                </div>
                <button 
                    type='submit' 
                    className='black_btn w-full'
                    disabled={submitting}
                >
                    Register
                </button>
            </form>
        </div>
        
      );
}

export default Register