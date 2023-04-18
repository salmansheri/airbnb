import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";



const FavoritesPage = async () => {
    const listings = await getFavoriteListings(); 
    const currentUser = await getCurrentUser(); 

    if(listings.length === 0) {
        return(
            <div>
                <EmptyState 
                    title="No title found"
                    subtitle="Looks like you have "
                />
            </div>
        )

    }

    return (
        <div>
            {/* @ts-ignore  */}
           <FavoritesClient listings={listings} currentUser={currentUser} />
        </div>
    )
    
}

export default FavoritesPage; 