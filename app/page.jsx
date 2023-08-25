'use client'

import Feed from "@components/Feed"
import { useEffect, useState } from "react"

const Home = () => {

  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const handleSession = () => {
      const userJSON = sessionStorage.getItem('user');
      const user = userJSON ? JSON.parse(userJSON) : null;
      if (user) {
          setUsername(user.username);
      } else {
          setUsername(null);
      }
  };

  handleSession();

  window.addEventListener('sessionChanged', handleSession);

  return () => {
      window.removeEventListener('sessionChanged', handleSession);
  };
  
  }, []);

  return (
    <section className='w-full flex-center flex-col'>
        <h1 className='head_text text-center'>
            Welcome
            <br className='max-md:hidden'></br>
            <span className='orange_gradient text-center'> {username}</span>
        </h1>
        <p className='desc text-center'>Share your thoughts and engage in the Blog community</p>

        <Feed></Feed>

    </section>
  )
}

export default Home