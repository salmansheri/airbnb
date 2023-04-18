import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";

import { getReservations } from "../actions/getReservation";
import ReservationClient from "./ReservationClient";

const ReservationPage = async () => {
    const currentUser = await getCurrentUser(); 

    if(!currentUser) {
        return(
            <div>
                <EmptyState 
                    title="Unauthorized"
                    subtitle="Please Login"
                />
            </div>
        )
    }

    const reservations = await getReservations({
        authorId: currentUser.id,
    })

    if(reservations.length === 0) {
        return(
            <EmptyState 
                title="No reservation found"
                subtitle="Looks like you have no reservations"
            />
        )
    }
   
    return(
        <div>
            {/* @ts-ignore  */}
            <ReservationClient  reservations={reservations} currentUser={currentUser} />
        </div>
    )
}

export default ReservationPage; 