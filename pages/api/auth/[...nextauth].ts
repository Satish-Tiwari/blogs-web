import { NextApiHandler } from "next";
import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import prisma from "../../../lib/prisma";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);

export default authHandler;

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: getGithubCredentials().clientId,
            clientSecret: getGithubCredentials().clientSecret,
        }),
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
}

function getGithubCredentials() {
    const clientId = process.env.GITHUB_ID
    const clientSecret = process.env.GITHUB_SECRET

    if (!clientId || clientId.length === 0) {
        throw new Error('Missing GITHUB_ID')
    }

    if (!clientSecret || clientSecret.length === 0) {
        throw new Error('Missing GITHUB_SECRET')
    }

    return { clientId, clientSecret }
}