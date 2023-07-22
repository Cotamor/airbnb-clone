'use client'

import { formatterJPY } from '@/libs/utils'
import { Range } from 'react-date-range'
import DatePicker from '../inputs/date-picker'
import Button from '../button'

interface ListingReservationProps {
  price: number
  totalPrice: number
  dateRange: Range
  onSubmit: () => void
  disabled: boolean
  disabledDates: Date[]
  onChangeDate: (value: Range) => void
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
  onChangeDate,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          {formatterJPY.format(price)}
        </div>
        <div className="font-light text-neutral-600">/ night</div>
      </div>
      <hr />
        <DatePicker
          value={dateRange}
          disabledDates={disabledDates}
          onChange={(value) => onChangeDate(value.selection)}
        />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>{formatterJPY.format(totalPrice)}</div>
      </div>
    </div>
  )
}
export default ListingReservation
