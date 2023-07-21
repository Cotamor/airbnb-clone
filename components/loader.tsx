'use client'

import { PuffLoader } from 'react-spinners'

export const Loader = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <PuffLoader color="purple" size={100} />
    </div>
  )
}
