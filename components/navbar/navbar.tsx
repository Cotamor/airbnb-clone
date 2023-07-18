import Container from '@/components/container'
import Image from 'next/image'
import Link from 'next/link'
import Search from '@/components/navbar/search'
import UserMenu from '@/components/navbar/user-menu'
import Categories from '@/components/navbar/categories'
import { SafeUser } from '@/types'

interface NavbarProps {
  currentUser?: SafeUser | null
}

const Navbar:React.FC<NavbarProps> = ({
  currentUser
}) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Link href="/">
              <Image
                alt="logo"
                src="/images/logo.png"
                height={100}
                width={100}
              />
            </Link>
            <Search />
            <UserMenu currentUser={currentUser}/>
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}
export default Navbar
