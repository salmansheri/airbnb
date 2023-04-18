'use client'; 


import { useRouter } from 'next/navigation'; 
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from '@/components/listings/ListingCard';
import { SafeListing, SafeUser } from "@/types";

interface PropertiesClientProps {
    listings: SafeListing[]; 
    currentUser?: SafeUser | null; 


}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings,
    currentUser
}) => {
    const router = useRouter(); 
    const [deletingId, setDeletingId] = useState(""); 

    const onCancel = useCallback( async (id: string) => {
        setDeletingId(id); 

        await axios.delete(`/api/listings/${id}`)
            .then(() => {
                toast.success("Listing deleted"); 
                router.refresh(); 
            })
            .catch((error: any) => {
                toast.error(error?.response?.data?.error)
            })
            .finally(() => [
                setDeletingId("")
            ])
            
    }, [router])


    return(
        <div>
            <Container>
                <Heading 
                    title="Properties"
                    subtitle="List of your Properties"
                />
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:gird-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                    {/* mapping the reservations  */}
                    {listings.map((listing) => (
                        <ListingCard 
                        key={listing.id}
                        data={listing}
                    
                        actionId={listing.id}
                        onAction={onCancel}
                        disabled={deletingId === listing.id}
                        actionLabel="Delete Propertys"
                        currentUser={currentUser}


                        />
                    ))}


                </div>

            </Container>
        </div>
    )
}

export default PropertiesClient; 