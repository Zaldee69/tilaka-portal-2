import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    access_token: string;
    refresh_token: string;
    device_token: string;
    role: string;
  }

  interface Session {
    access_token: string;
    refresh_token: string;
    device_token: string;
    role: string;
    user: {
      id: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    access_token: string;
    refresh_token: string;
    device_token: string;
    role: string;
  }
}
