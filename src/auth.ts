import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import { authConfig } from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        await dbConnect();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser && user.email) {
            await User.create({
              name: user.name || 'No Name',
              email: user.email,
              image: user.image || '',
              role: 'user',
            });
          }
          return true;
        } catch (error) {
          console.error("Error saving user", error);
          return false;
        }
      }
      return true;
    },
    async session({ session }) {
      return session;
    }
  },
})
