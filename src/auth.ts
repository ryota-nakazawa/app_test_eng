import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import { authConfig } from "./auth.config"

declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user: {
      role?: string;
    } & import("next-auth").DefaultSession["user"]
  }
}

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
          const isAdminEmail = process.env.ADMIN_EMAIL && user.email === process.env.ADMIN_EMAIL;
          const role = isAdminEmail ? 'admin' : 'user';

          if (!existingUser && user.email) {
            await User.create({
              name: user.name || 'No Name',
              email: user.email,
              image: user.image || '',
              role: role,
            });
          } else if (existingUser && isAdminEmail && existingUser.role !== 'admin') {
            // Auto-promote if matches ADMIN_EMAIL
            existingUser.role = 'admin';
            await existingUser.save();
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
      if (session.user?.email) {
        await dbConnect();
        const user = await User.findOne({ email: session.user.email });
        if (user) {
          session.user.role = user.role;
          // Add ID to session as well for API usage
          session.user.id = user._id.toString();
        }
      }
      return session;
    }
  },
})
