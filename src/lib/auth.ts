import { signInSchema } from "@/utils/zod";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { collection, getDocs, query, where } from "firebase/firestore";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { db } from "./firebaseConfig";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: FirestoreAdapter(db as any),
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials) {
        const parsedCredentials = signInSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          const zodError = parsedCredentials.error as ZodError;
          throw new Error(zodError.errors[0].message);
        }

        const { email, password } = parsedCredentials.data;

        const userDoc = await getDocs(
          query(collection(db, "users"), where("email", "==", email))
        );

        if (userDoc.empty) {
          throw new Error("User not found");
        }

        const user = userDoc.docs[0].data();

        const passwordMatch = (await user.password) === password;

        if (!passwordMatch) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
});
