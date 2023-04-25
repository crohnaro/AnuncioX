import axios from "axios";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
		Providers.Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
		}),
		
    Providers.Credentials({
      name: "Credentials",
      async authorize(credentials) {
        const res = await axios.post("http://localhost:3000/api/auth/signin", credentials);

        const user = res.data;
        if (user) {
          return user;
        } else {
          throw pages.error
        }
      },
    }),
  ],

	session: {
		jwt: true
	},

	jwt: {
		secret: process.env.JWT_TOKEN
	},

	pages:{
		error: '/auth/signin'
	},

  database: process.env.MONGODB_URI,
});
