'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  if (!data.length) {
    return <p className='text-center text-gray-500'>No prompts found.</p>
  }

  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
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

  const fetchPosts = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/prompt', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch prompts')
      }

      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error loading prompts:', error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
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
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>

      {isLoading && (
        <div className='mt-16 flex justify-center items-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500'></div>
        </div>
      )}

      {error && (
        <div className='mt-16 text-center text-red-500'>
          <p>{error}</p>
          <button onClick={fetchPosts} className='mt-4 black_btn'>
            Try Again
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <PromptCardList data={posts} handleTagClick={() => {}} />
      )}
    </section>
  )
}

export default Feed
