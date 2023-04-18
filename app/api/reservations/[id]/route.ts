import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";

import prisma from "@/libs/prismaDB";

interface IParams {
  id?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { id } = params;

  if (!id || typeof id !== "string") {
    throw new Error("Invalid Id");
  }

  const reservation = await prisma.reservations.deleteMany({
    where: {
      id: id,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservation);
}
