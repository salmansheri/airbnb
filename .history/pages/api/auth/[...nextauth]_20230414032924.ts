import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'; 
import CredentialsProvider from 'next-auth/providers/credentials';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt'; 


import prisma from '@/libs/prismaDB'; 


export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma), 
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string, 
            clientSecret: process.env.GITHUB_SECRET as string
        }), 
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }), 
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'email'},
                password: {label: 'password', type: 'password'}
            }, 
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials")
                }
                const user  = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                }); 

                if(!user && user.password === credentials?.password) {
                    throw new Error('Invalid Credentials')
                }

                // const isCorrectPassword = await bcrypt.compare(
                //     credentials.password, 
                //     user.hashedPassword,
                // ); 

                // if(!isCorrectPassword) {
                //     throw new Error("Invalid Credentials"); 

                // }

                return user; 
            }

        })
    ], 
    pages: {
        signIn: '/'
    }, 
    
    secret: process.env.NEXTAUTH_SECRET, 
}

export default NextAuth(authOptions); 


