import getCurrentUser from '@/actions/get-current-user'
import prismadb from '@/libs/prismadb'
import { NextResponse } from 'next/server'

interface IParams {
  reservationId?: string
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    const { reservationId } = params

    if (!reservationId || typeof reservationId !== 'string') {
      return new NextResponse('Invalid Id', { status: 400 })
    }

    const reservation = await prismadb.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    })

    return NextResponse.json(reservation)
  } catch (error) {
    console.log('[RESERVATION_ID_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
