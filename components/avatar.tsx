import Image from 'next/image'

interface AvatarProps {
  src: string | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      alt="Avatar"
      className="rounded-full object-cover"
      fill
      src={src || '/images/placeholder.jpg'}
    />
  )
}
export default Avatar
