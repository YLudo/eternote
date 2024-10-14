import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
        error: "/login?error=true"
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("L'adresse e-mail et le mot de passe sont obligatoires.");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if(!user) {
                    throw new Error("L'adresse e-mail spécifiée n'existe pas.");
                }

                if(!user.active) {
                    throw new Error("Veuillez vérifier votre adresse e-mail.");
                }

                const isPasswordValid = await compare(credentials.password, user.password);

                if (!isPasswordValid) {
                    throw new Error("Le mot de passe spécifié est incorrect.");
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.username,
                };
            },
        }),
    ],
    callbacks: {
        session({ session, token }) {
            session.user.id = token.sub;
            return session
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};