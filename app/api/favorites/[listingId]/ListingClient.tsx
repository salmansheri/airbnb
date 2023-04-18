"use client";

import { Reservations } from "@prisma/client";
import { SafeListing, SafeUser } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from 'next/navigation'; 
import { differenceInCalendarDays,  eachDayOfInterval } from "date-fns";
import { toast } from "react-hot-toast";
import axios from "axios";


import { categories } from "@/components/navbar/Categories";
import Container from "@/components/Container";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";
import useLoginModal from "@/hooks/userLoginModal";
import ListingReservation from "@/components/listings/ListingReservation";
import { Range } from "react-date-range";


const initialDateRange = {
  startDate: new Date(), 
  endDate: new Date(),
  key: 'selection',

}

interface ListingClientProps {
  reservations: Reservations[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  reservations = [],
  listing,
  currentUser,
}) => {
  const loginModal = useLoginModal(); 
  const router = useRouter(); 

  const disabledDates = useMemo(() => {
    let dates: Date[] = []; 
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      }); 

      dates = [...dates, ...range]; 
    }); 

    return dates; 

  }, [reservations]); 

  const [isLoading, setIsLoading] = useState(false); 

  const [totalPrice, setTotalPrice] = useState(listing.price); 
 
  const [dateRange, setDateRange] = useState<Range>(initialDateRange); 

  const onCreateReservation = useCallback(async () => {
    if(!currentUser) {
      return loginModal.onOpen(); 
    }

    setIsLoading(true); 
    await axios.post('/api/reservations', {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing.id,
    })
      .then(() => {
        toast.success("Listing Reserved!"); 
        setDateRange(initialDateRange); 
        // Redirect to /trips
        router.refresh(); 

      })
      .catch((err) => {
        
        toast.error("something went wrong")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [
    currentUser,
    dateRange,
    listing?.id,
    router,
    loginModal,
    totalPrice
    
  ]); 

  useEffect(() => {
    if(dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate,
      ); 

      if(dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price); 
      } else {
        setTotalPrice(listing.price); 
      }
    }

  }, [dateRange, listing.price])


  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="flex grid-cols-1 md:grid-cols-7 md:gap-10 mt-6 ">
            <ListingInfo 
                user={listing.user}
                category={category}
                description={listing.description}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
                locationValue={listing.locationValue}

            />

            <div className="order-first mb-10 md:order-last md:col-span-3">
             
              <ListingReservation 
                price={listing.price}
                totalPrice={totalPrice}
                dateRange={dateRange}
                onChangeDate={(value) => setDateRange(value)}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}

              />

            </div>

          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
