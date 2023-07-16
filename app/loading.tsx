'use client'

import { Loader } from '@/components/loader'

const Loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-green-500">
      <Loader />
    </div>
  )
}
export default Loading
