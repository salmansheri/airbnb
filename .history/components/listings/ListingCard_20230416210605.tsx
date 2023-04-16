'use client'

import { SafeUser } from "@/types";
import { Listing, Reservations, User } from "@prisma/client";

interface ListingCardProps {
    data: Listing; 
    reservation? : Reservations; 
    onAction?: (id: string) => void; 
    disabled?: boolean; 
    actionId?:string; 
    currentUser?: SafeUser | null; 


}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionId,
    currentUser
}) => {
    return (
        <div></div>
    )
}

export default ListingCard; 