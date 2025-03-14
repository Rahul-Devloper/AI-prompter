'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'

const EditPrompt = () => {
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  console.log('promptId=>', promptId)
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/prompt/${promptId}`)
        const data = await response.json()
        setPost(data)
      } catch (error) {
        console.error('Error fetching prompt:', error)
      } finally {
        setIsLoading(false)
      }
    }
    if (promptId) getPromptDetails()
  }, [promptId])

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[200px]'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500'></div>
      </div>
    )
  }

  if (!post.prompt) return null

  const updatePrompt = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    if (!promptId) return alert('Prompt not found')

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      })

      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      //always run after try and catch
      setSubmitting(false)
    }
  }

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt
