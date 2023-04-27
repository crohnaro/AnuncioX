import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"


export const authOptions = {
  providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const res = await axios.post(`${process.env.APP_URL}/api/auth/signin`, credentials);

        const user = res.data;
        if (user) {
          return user;
        } else {
          throw pages.error
        }
      },
    }),
  ],

  secret: '3v3exChkDfWTNE9LGhYglR00oqZPi7JhVu7XnsvqNXg=',
  
  session: {
    strategy: 'jwt',
  },

	pages:{
		error: '/auth/signin?i=1'
	},

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },

    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      
      return session
    },
  }
};

export default NextAuth(authOptions)
