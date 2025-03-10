'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/prompt')

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to fetch prompts')
        }

        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <section className='feed'>
      <form action='' className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          className='search_input peer'
          required
          value={searchText}
          onChange={handleSearchChange}
        />
      </form>

      {isLoading && (
        <div className='mt-16 text-center'>
          <p>Loading prompts...</p>
        </div>
      )}

      {error && (
        <div className='mt-16 text-center text-red-500'>
          <p>Error: {error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <PromptCardList data={posts} handleTagClick={() => {}} />
      )}
    </section>
  )
}

export default Feed
