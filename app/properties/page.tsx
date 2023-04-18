import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";

import { getReservations } from "../actions/getReservation";

import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";




const PropertiesPage = async () => {
    const currentUser = await getCurrentUser(); 

    if(!currentUser) {
        return (
            <EmptyState 
                title="Unauthorized"
                subtitle="Please login"
            />
        )
    }

    const listings = await getListings({
        userId: currentUser.id
    })

    if(listings.length === 0) {
        return(
            <EmptyState 
                title="No Properties Found"
                subtitle="Looks like you have no Properties"
            />
        )
    }

    

    return(
        <div>
              
            <PropertiesClient 
          
                listings={listings}
                currentUser={currentUser}
            />
        </div>
    )
}

export default PropertiesPage; 