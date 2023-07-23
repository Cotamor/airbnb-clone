import prismadb from '@/libs/prismadb'

export interface IListingsParams {
  userId?: string
  guestCount?: number
  roomCount?: number
  bathroomCount?: number
  startDate?: string
  endDate?: string
  locationValue?: string
  category?: string
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      category,
    } = params

    let query: any = {}

    if (userId) {
      query.userId = userId
    }

    if (category) {
      query.category = category
    }
    // + plub sign transform roomCount as string into as definit number
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      }
    }
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      }
    }
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      }
    }

    if (locationValue) {
      query.locationValue = locationValue
    }
    // NOT:reverse query
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      }
    }

    const listings = await prismadb.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }))

    return safeListings
  } catch (error: any) {
    throw new Error(error)
  }
}
