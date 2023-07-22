import getCurrentUser from "@/actions/get-current-user"
import getListingById from "@/actions/get-listing-by-id"
import ClientOnly from "@/components/client-only"
import EmptyState from "@/components/empty-state"
import ListingClient from "./components/listing-client"
import getReservations from "@/actions/get-reservations"

interface IParams {
  listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {

  const listing = await getListingById(params)
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser()

  if(!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }


  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}
export default ListingPage
