'use client'


import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from 'next/navigation'; 

import { SafeReservations, SafeUser } from "@/types";

import Heading from "@/components/Heading";
import Container from "@/components/Container";
import ListingCard from "@/components/listings/ListingCard";

interface ReservationClientProps {
    reservations: SafeReservations[]; 
    currentUser: SafeUser | null; 
}


const ReservationClient: React.FC<ReservationClientProps> = ({
    reservations,
    currentUser
    
}) => {
    const router = useRouter(); 
    const [deletingId, setDeletingId] = useState(""); 

    const onCancel = useCallback( async (id: string) => {
        setDeletingId(id); 

        await axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success("Reservation cancelled")
                router.refresh(); 
            })
            .catch(() => {
                toast.error("something went wrong")
            })
            .finally(() => {
                setDeletingId(""); 
            })

    }, [router])
    return(
        <div>
            <Container>
                <Heading 
                    title="Reservations"
                    subtitle="Bookings on your Properties"
                />

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                    {reservations.map((reservation) => (
                        // @ts-ignore 
                        <ListingCard  key={reservation.id}  data={reservation.listing}
                            reservation={reservation}
                            actionId={reservation.id}
                            onAction={onCancel}
                            disabled={deletingId === reservation.id}
                            actionLabel="Cancel guest reservations"
                            currentUser={currentUser}
                        
                            />
                    ))}

                </div>

            </Container>
        </div>
    )
}

export default ReservationClient; 