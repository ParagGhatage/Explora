import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string;
      name?: string;
    } & DefaultSession['user'];
  }

  interface User {
    _id?: string;
    name?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id?: string;
    name?: string;
  }
}