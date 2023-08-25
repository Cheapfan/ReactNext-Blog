"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';

import BurgerButton from '../components/BurgerButton';


const Navbar = () => {
    const router = useRouter();
    
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const [userId, setUserId] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {
        const handleSession = () => {
            const userJSON = sessionStorage.getItem('user');
            const user = userJSON ? JSON.parse(userJSON) : null;
            if (user) {
                setUserId(user.id);
                setIsUserLoggedIn(true);
            } else {
                setUserId(null);
                setIsUserLoggedIn(false);
            }
        };

        handleSession();
    
        window.addEventListener('sessionChanged', handleSession);
        return () => {
            window.removeEventListener('sessionChanged', handleSession);
        };
        
    }, []);    
    
    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href='/' className='flex gap-2 flex-center'>
                <Image
                    src='/assets/images/logo.png'
                    alt='Blog Logo'
                    height={35}
                    width={35}
                    className='object-contains'
                ></Image>
                <p className='logo_text'>Blog</p>
            </Link>
            <div className='sm:flex hidden'>
                {isUserLoggedIn ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href="/NewPost"
                        className='black_btn'>
                            Create Post
                        </Link>
                        <button type='button' onClick={() => {
                            sessionStorage.removeItem('user')
                            setIsUserLoggedIn(false);
                            setUserId(null);
                            window.dispatchEvent(new Event('sessionChanged'));
                            window.location.reload();
                        }} className='outline_btn'>Sign Out</button>
                    </div>
                ) : (
                    <div className='flex gap-3 md:gap-5'>
                        
                        <button
                        type='button'
                        onClick={() => {router.push('/Login')}}
                        className='black_btn'
                        >
                            Sign in
                        </button>
                    </div>
                )}

                
            </div>

            <div className='sm:hidden flex relative'>
                {isUserLoggedIn ? (
                    <div className='flex'>
                        <BurgerButton onToggle={() => setToggleDropdown((prev) => !prev)} />
                        {toggleDropdown && (
                            <div className='dropdown'>
                                <Link
                                    href='/NewPost'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Post
                                </Link>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setToggleDropdown(false)
                                        sessionStorage.removeItem('user')
                                        setIsUserLoggedIn(false);
                                        setUserId(null);
                                        window.location.reload();
                                    }}
                                    className='mt-5 w-full black_btn'
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <button
                        type='button'
                        onClick={() => {router.push('/Login')}}
                        className='black_btn'
                        >
                            Sign in
                        </button>
                     
                    </>
                )}
            </div>

        </nav>
    )
}

export default Navbar