import getCurrentUser from "@/actions/get-current-user"
import prismadb from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(
  req: Request,
) {
  try {
    const currentUser = await getCurrentUser()

    if(!currentUser) {
      return new NextResponse('Unauthorized', {status: 403})
    }

    const body = await req.json()
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
    } = body

    Object.keys(body).forEach((value:any) => {
      if(!body[value]) {
        NextResponse.error()
      }
    })

    const listing = await prismadb.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price,10),
        userId: currentUser.id
      }
    })

    return NextResponse.json(listing)
  } catch (error) {
    console.log('[LISTINGS_POST]', error)
    return new NextResponse('Internal error', {status: 500})
  }
}