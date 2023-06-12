import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@utils/db.util";
import User from "@models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session?.user?.email })
      return { ...session, user: { ...session.user, id: sessionUser._id.toString() } }
    },
    async signIn(params) {
      const { account, user, credentials } = params

      // Google provider doesn't have image, it has picture
      type GoogleProfile = (typeof params.profile & { picture?: string }) | undefined

      const profile: GoogleProfile = params.profile

      try {
        await connectDB()

        // check if user already exists
        const userExists = await User.findOne({ email: profile?.email })

        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(' ', '').toLowerCase(),
            image: profile?.picture
          })
        }

        return true
      } catch (err: any) {
        console.log("Error checking if user exists: ", err);
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }