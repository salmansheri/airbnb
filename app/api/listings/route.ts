import { NextResponse } from "next/server";

import prisma from "@/libs/prismaDB";

import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      price,
    } = body;

    Object.keys(body).forEach((value: any) => {
      if (!body[value]) {
        NextResponse.error();
      }
    });

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        // @ts-ignore
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing);
  } catch (err) {
    return NextResponse.error(); 
  }
}
