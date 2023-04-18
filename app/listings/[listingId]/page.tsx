import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListing";
import ListingClient from "@/app/api/favorites/[listingId]/ListingClient";
import EmptyState from "@/components/EmptyState";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }
  return (
    <div>
      <ListingClient listing={listing} currentUser={currentUser} />
    </div>
  );
};

export default ListingPage;
