'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'
import { Router } from '@node_modules/next/router'

const MyProfile = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      if (status === 'loading') return

      if (!session?.user) {
        router.push('/login')
        return
      }

      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`)
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [session, status])

  if (status === 'loading' || loading) {
    return <div>Loading...</div>
  }

  if (!session?.user) {
    return null // Router will handle redirect
  }

  return (
    <Profile
      name={session.user.name || 'User'}
      desc='Welcome to your profile page'
      data={posts}
      handleEdit={() => {}}
      handleDelete={() => {}}
    />
  )
}

export default MyProfile
