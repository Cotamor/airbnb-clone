'use client'

import useCountries from '@/hooks/use-countries'
import Select from 'react-select'

export type CountrySelectValue = {
  flag: string
  label: string
  latlng: number[]
  region: string
  value: string
}

interface CountrySelectProps {
  value?: CountrySelectValue
  onChange: (value: CountrySelectValue) => void
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries()
  // console.log(getAll()[0])
  return (
    <Select
      placeholder="Anywhere"
      isClearable
      options={getAll()}
      value={value}
      onChange={(value) => onChange(value as CountrySelectValue)}
      formatOptionLabel={(option: any) => (
        <div className="flex flex-row items-center gap-3">
          <div className="">{option.flag}</div>
          <div className="">
            {option.label},
            <span className='text-neutral-500 ml-1'>
              {option.region}
            </span>
          </div>
        </div>
      )}
      classNames={{
        control: () => 'p-1',
        input: () => 'text-lg',
        option: () => 'text-lg',
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 4,
        colors: {
          ...theme.colors,
          primary: '#f76079',
          primary25: '#ffe4e6',
          primary50: '#ffe4e6',
          primary75: '#ffe4e6',
        },
      })}
    />
  )
}
export default CountrySelect
