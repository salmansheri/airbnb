import { Listing, Reservations, User } from "@prisma/client";


export type SafeUse = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
    createdAt: string; 
    updatedAt: string; 
    emailVerified: string | null; 
}