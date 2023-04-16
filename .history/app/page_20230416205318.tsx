import  Container  from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import getListings from "./actions/getListings";


export default async function Home() {
  const listings = await getListings(); 
  const isEmpty = true; 

  if(listings.length === 0) {
    return(
      <div>
        <EmptyState showReset />
      </div>
    )
  }
  return (
    <div>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing: any, index:any) => (
            <div key={listing.id}>{listing.title}</div>
          ))}

        </div>
      </Container>
    </div>

   
  )
}
