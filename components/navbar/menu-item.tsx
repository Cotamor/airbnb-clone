'use client'

interface MenuItemProps {
  label: string
  onClick: () => void
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick }) => {
  return (
    <div onClick={onClick} className="px-4 py-3 hover:bg-nutral-100  transition font-semibold">
      {label}
    </div>
  )
}
export default MenuItem
