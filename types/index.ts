import { Listing, Reservations, User } from "@prisma/client";

export type SafeListing = Omit<
    Listing, 
    "createdAt" | 'updatedAt' | 'emailVerified'
> & {
    createdAt: string; 
    updatedAt: string; 
    emailVerified: string | null; 
}

export type SafeReservations = Omit<
    Reservations,
    'createdAt' | 'startDate' | 'listing'
> & {
    createdAt: string; 
    startDate: string; 
    endDate: string
}


export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}