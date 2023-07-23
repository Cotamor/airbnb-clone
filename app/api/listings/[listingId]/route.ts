import getCurrentUser from '@/actions/get-current-user'
import prismadb from '@/libs/prismadb'
import { NextResponse } from 'next/server'

interface IParams {
  listingId?: string
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    const { listingId } = params

    if (!listingId || typeof listingId !== 'string') {
      return new NextResponse('Invalid Id', { status: 400 })
    }

    const listing = await prismadb.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    })

    return NextResponse.json(listing)
  } catch (error) {
    console.log('LISTING_ID_DELETE', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
