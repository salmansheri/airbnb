import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";

import { getReservations } from "../actions/getReservation";
import TripsClient from "./TripsClient";




const TripsPage = async () => {
    const currentUser = await getCurrentUser(); 

    if(!currentUser) {
        return (
            <EmptyState 
                title="Unauthorized"
                subtitle="Please login"
            />
        )
    }

    const reservations = await getReservations({
        userId: currentUser.id
    })

    if(reservations.length === 0) {
        return(
            <EmptyState 
                title="No Trips Found"
                subtitle="Looks like you havent reserved any trips"
            />
        )
    }

    

    return(
        <div>
              {/* @ts-ignore  */}
            <TripsClient  reservations={reservations}  currentUser={currentUser} />
        </div>
    )
}

export default TripsPage; 