import getCurrentUser from '@/actions/get-current-user'
import prismadb from '@/libs/prismadb'
import { NextResponse } from 'next/server'

interface IParams {
  listingId?: string
}

export async function POST(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const { listingId } = params

    if (!listingId || typeof listingId !== 'string') {
      return new NextResponse('Invalid ID', { status: 403 })
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])]

    favoriteIds.push(listingId)

    const user = await prismadb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log('[LISTING_ID_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const { listingId } = params

    if (!listingId || typeof listingId !== 'string') {
      return new NextResponse('Invalid ID', { status: 403 })
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])]

    favoriteIds = favoriteIds.filter((id) => listingId !== id)

    const user = await prismadb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log('[LISTING_ID_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
