'use client'

import Container from "@/components/container"
import ListingHead from "@/components/listings/listing-head"
import ListingInfo from "@/components/listings/listing-info"
import { categories } from "@/components/navbar/categories"
import useLoginModal from "@/hooks/use-login-modal"
import { SafeListing, SafeUser } from "@/types"
import { Reservation } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"

interface ListingClientProps {
  reservations?: Reservation[]
  listing: SafeListing & {
    user: SafeUser
  }
  currentUser?: SafeUser | null
}

const ListingClient:React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations = []
}) => {
  const loginModal = useLoginModal()
  const router = useRouter()

  // disabledDates

  const category = useMemo(()=>{
    return categories.find((item) => item.label === listing.category)
  },[listing.category])

  const [isLoading, setIsLoading] = useState(false)
  const [totlaPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState()

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-30">
              reservation
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
export default ListingClient