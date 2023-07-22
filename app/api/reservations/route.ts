import getCurrentUser from '@/actions/get-current-user'
import prismadb from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const body = await req.json()

    const { listingId, totalPrice, startDate, endDate } = body

    if(!listingId || !startDate || !endDate || !totalPrice) {
      return new NextResponse('Missing inputs', {status: 400})
    }

    const listingAndReservation = await prismadb.listing.update({
      where: {
        id: listingId
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice
          }
        }
      }
    })
    return NextResponse.json(listingAndReservation)
  } catch (error) {
    console.log('[RESERVATIONS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
