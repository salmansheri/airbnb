import prisma from "@/libs/prismaDB";


export default async function getListings() {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        }); 

        return listings; 


    } catch(err: any) {
        throw new Error(err); 

    }
}