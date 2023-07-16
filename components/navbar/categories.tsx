'use client'

import {usePathname,useSearchParams} from 'next/navigation'
import { TbBeach, TbMountain } from 'react-icons/tb'
import {
  GiWindmill,
  GiIsland,
  GiBoatFishing,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiCactus,
  GiBarn,
} from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import { BsSnow } from 'react-icons/bs'
import { IoDiamond } from 'react-icons/io5'
import { FaSwimmingPool, FaSkiing } from 'react-icons/fa'
import Container from '@/components/container'
import CategoryBox from '@/components/categoryBox'

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Pools',
    icon: FaSwimmingPool,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Caves',
    icon: GiCaveEntrance,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is close to the beach!',
  },
]

const Categories = () => {
  const params = useSearchParams()
  const category = params?.get('category')
  const pathname = usePathname()
  const isMainPage = pathname === '/'

  if(!isMainPage) {
    return null
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  )
}
export default Categories
