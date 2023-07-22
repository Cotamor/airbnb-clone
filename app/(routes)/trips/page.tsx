import getCurrentUser from "@/actions/get-current-user"
import getReservations from "@/actions/get-reservations"
import ClientOnly from "@/components/client-only"
import EmptyState from "@/components/empty-state"
import TripsClient from "./components/trips-client"

const TripsPage = async() => {
  const currentUser = await getCurrentUser()

  if(!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({userId: currentUser.id})

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you have't reserved any trips."
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}
export default TripsPage