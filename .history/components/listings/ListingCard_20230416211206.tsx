'use client'

import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/types";
import { Listing, Reservations, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

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
    const router = useRouter(); 
    const { getByValue } = useCountries(); 
    const location = getByValue(data.locationValue); 

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); 

        if(disabled ) {
            return; 
        }

        onAction?.(actionId); 


    }, [onAction])



    return (
        <div></div>
    )
}

export default ListingCard; 