import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = { id: 1, name: "Test User", email: "test@gmail.com" };
        const password = "password";
        if (
          credentials.email === user.email &&
          credentials.password === password
        ) {
          return Promise.resolve({ email: user.email, name: user.name });
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
});
