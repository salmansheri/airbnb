import { Listing, Reservations, User } from "@prisma/client";

export type SafeListing = Omit<
    Listing, 
    "createdAt" | 'updatedAt' | 'emailVerified'
> & {
    createdAt: string; 
    updatedAt: string; 
    emailVerified: string | null; 
}


export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}