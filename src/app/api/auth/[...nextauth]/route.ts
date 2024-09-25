import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import NextAuth from 'next-auth';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Custom Login',
      credentials: {
        tilaka_name: { label: 'Tilaka Name', type: 'text' },
        // email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        device_token: { label: 'Device Token', type: 'text' }
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }

        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_CORE_API_URL}/v2/login`,
            {
              tilaka_name: credentials.tilaka_name,
              password: credentials.password,
              device_token: credentials.device_token
            }
          );

          const data = res.data;

          if (data.success) {
            return {
              id: data.data.user_id || credentials.tilaka_name, // Gunakan id dari API atau tilaka_name
              access_token: data.data.access_token,
              refresh_token: data.data.refresh_token,
              device_token: data.data.device_token,
              role: data.data.role
            };
          }
          return null;
        } catch (error) {
          console.error('Login error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.access_token = user.access_token;
        token.refresh_token = user.refresh_token;
        token.device_token = user.device_token;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.access_token = token.access_token as string;
      session.refresh_token = token.refresh_token as string;
      session.device_token = token.device_token as string;
      session.role = token.role as string;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  }
});

export { handler as GET, handler as POST };
