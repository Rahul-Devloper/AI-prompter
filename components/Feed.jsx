'use client'
import React, { useEffect, useState } from 'react'

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
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/prompt', {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }

        const data = await response.json()
        if (mounted) {
          setPosts(data)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
      // finally {
      //   if (mounted) {
      //     setIsLoading(false)
      //   }
      // }
    }

    if (mounted) {
      fetchPosts()
    }
  }, [mounted])

  if (!mounted) return null

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

      {isLoading ? (
        <div className='mt-16 flex justify-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500'></div>
        </div>
      ) : posts.length > 0 ? (
        <PromptCardList data={posts} handleTagClick={() => {}} />
      ) : (
        <div className='mt-16 text-center text-gray-500'>No prompts found.</div>
      )}
    </section>
  )
}

export default Feed
