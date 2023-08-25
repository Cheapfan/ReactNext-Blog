'use client'

import { useState, useEffect } from 'react'
import Router from 'next/navigation'
import axios from 'axios'

import Card from './Card'

const CardList = ({data, currentUser}) => {
  return (
    <div className='flex min-h-screen'>
        <div className='mt-16 promt_layout w-full items-center'>
        {data.map((post) => {
            return (
              <Card
                key={post._id}
                post={post}
                currentUser={currentUser}
              />
            )
          
        })}
      </div>
    </div>
    
  )
}

const Feed = () => {
  const [totalPage, setTotalPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState('')
  const [allPosts, setAllPosts]= useState([])
  const [posts, setPosts] = useState([])
  const [userid, setUserid] = useState('')

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    
    const filteredPosts = allPosts.filter(post => 
      post.title.toLowerCase().includes(e.target.value.toLowerCase()) || 
      post.user.username.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setPosts(filteredPosts);
  }

  useEffect(() => {
    const userJSON = sessionStorage.getItem('user');
    const user = userJSON ? JSON.parse(userJSON) : null;
    if(user) {
      setUserid(user.id)
    } else {
      setUserid('')
    }
    const fetchPosts = async () => {
      axios
      .get(`http://localhost:4000/api/allpost?page=${currentPage}`)

      .then(response => {
          const fetchedPosts = response.data.data;
          setPosts(fetchedPosts)
          setAllPosts(fetchedPosts)
          const lastPage = response.data.meta['last page']
          setTotalPage(lastPage)
      })
      .catch(error => {
          console.error("There was an error fetching the posts:", error);
      })
    }
    
    fetchPosts();
  }, [currentPage])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type="text"
          placeholder="Search for the username or title"
          value={searchText}
          onChange={handleSearchChange}
          className='search_input peer' 
        />
      </form>
      <div className='w-full'>
        <CardList
          className=''
          data ={posts}
          currentUser={userid}
        />
      </div>
      
      <div className='flex justify-center font-semibold text-2xl'>
        <button 
          className='mx-3'   
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage(prevPage => prevPage - 1)}
        >
          ←
        </button>

        {currentPage}

        <button 
          className='mx-3' 
          disabled={currentPage >= totalPage}
          onClick={() => setCurrentPage(prevPage => prevPage + 1)}
        >
          →
        </button>
      </div>
      
    </section>
  )
}

export default Feed