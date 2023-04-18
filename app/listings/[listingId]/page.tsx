import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListing";
import { getReservations } from "@/app/actions/getReservation";
import ListingClient from "@/app/api/favorites/[listingId]/ListingClient";
import EmptyState from "@/components/EmptyState";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params)
  const currentUser = getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }
  return (
    <div>
      {/* @ts-ignore */}
      <ListingClient listing={listing} currentUser={currentUser} reservations={reservations} />
    </div>
  );
};

export default ListingPage;
