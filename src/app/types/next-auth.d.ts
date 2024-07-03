import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string;
      userName?: string;
    } & DefaultSession['user'];
  }

  interface User {
    _id?: string;
    userName?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id?: string;
    userName?: string;
  }
}