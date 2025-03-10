//google authentication
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import User from '@models/user'

import { connectToDB } from '@utils/database'

// console.log(process.env.GOOGLE_ID)
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        await connectToDB()
        const sessionUser = await User.findOne({ email: session.user.email })
        if (sessionUser) {
          session.user.id = sessionUser._id.toString()
          session.user.image =
            sessionUser.image ||
            session.user.image ||
            '/assets/images/default-avatar.png'
          session.user.username = sessionUser.username
        }
        return session
      } catch (error) {
        console.error('Session callback error:', error)
        // Ensure user object has default values if DB connection fails
        session.user = {
          ...session.user,
          image: session.user?.image || '/assets/images/default-avatar.png',
        }
        return session
      }
    },
    async signIn({ profile }) {
      try {
        await connectToDB()

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email })

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture,
          })
        }

        return true
      } catch (error) {
        console.error('Sign in callback error:', error)
        return false
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
})

export { handler as GET, handler as POST }
