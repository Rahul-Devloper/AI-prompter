//google authentication
import NextAuth from 'next-auth/next'
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
      //the argument session is the session object that is received from the google authentication provider
      //to get information about the loggedIn user
      const sessionUser = await User.findOne({
        email: session.user.email,
      })

      session.user.id = sessionUser._id.toString()

      return session
    },
    async signIn({ profile }) {
      try {
        // serverless function
        await connectToDB()

        // check if user already exists
        const userExists = await User.findOne({
          email: profile.email,
        })

        // if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture,
          })
        }

        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
  },
})

export { handler as GET, handler as POST }
