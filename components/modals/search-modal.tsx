'use client'

import useSearchModal from '@/hooks/use-search-modal'
import { formatISO } from 'date-fns'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { useCallback, useMemo, useState } from 'react'
import { Range } from 'react-date-range'
import Heading from '../heading'
import Counter from '../inputs/counter'
import CountrySelect, { CountrySelectValue } from '../inputs/country-select'
import DatePicker from '../inputs/date-picker'
import Modal from './modal'

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter()
  const searchModal = useSearchModal()
  const params = useSearchParams()

  const [step, setStep] = useState(STEPS.LOCATION)

  const [location, setLocation] = useState<CountrySelectValue>()
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })

  const Map = useMemo(
    () => dynamic(() => import('@/components/map'), { ssr: false }),
    [location]
  )

  const onBack = useCallback(() => {
    setStep((value) => value - 1)
  }, [])
  const onNext = useCallback(() => {
    setStep((value) => value + 1)
  }, [])
  const onSubmit = useCallback(() => {
    if (step !== STEPS.INFO) {
      return onNext()
    }

    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    }

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate)
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    )
    setStep(STEPS.LOCATION)
    searchModal.onClose()
    router.push(url)
  }, [
    bathroomCount,
    dateRange,
    guestCount,
    location?.value,
    params,
    onNext,
    roomCount,
    step,
    router,
    searchModal,
  ])

  const cancel = useCallback(() => {
    setStep(STEPS.LOCATION)
    searchModal.onClose()
  }, [searchModal])

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search'
    }
    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }
    return 'Back'
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <DatePicker
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place!" />
        <Counter
          title="Guests"
          subtitle="How many guests are comimg?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <hr />
        <Counter
          title="bathRooms"
          subtitle="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onSubmit={onSubmit}
      onClose={cancel}
      title="Filters"
      actionLabel={actionLabel}
      body={bodyContent}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.INFO ? undefined : onBack}
    />
  )
}
export default SearchModal
