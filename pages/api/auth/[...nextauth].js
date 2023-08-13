import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/src/utils/dbConnect";
import UsersModel from "@/src/models/users";
import users from "@/src/models/users";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const res = await axios.post(
          `${process.env.APP_URL}/api/auth/signin`,
          credentials
        );

        const user = res.data;
        if (user) {
          return user;
        } else {
          throw pages.error;
        }
      },
    }),
  ],

  secret: "3v3exChkDfWTNE9LGhYglR00oqZPi7JhVu7XnsvqNXg=",

  session: {
    strategy: "jwt",
  },

  pages: {
    error: "/auth/signin?i=1",
  },

  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;

      return session;
    },

    async signIn({ profile }) {
      try {
        await dbConnect();

        const existingUser = await UsersModel.findOne({ email: profile.email });

        if (!existingUser) {
          // Crie um novo usuário no banco de dados com os dados do perfil
          const user = await users.create({
            email: profile.email,
            name: profile.name,
            image: profile.picture,
            authMethod: profile.authMethod,
          });
        }

        console.log(profile)
        return true; // Continue com o processo de autenticação
      } catch (error) {
        console.error("Erro ao autenticar:", error);
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);
