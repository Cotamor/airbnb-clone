'use client'

import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useCallback } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

const uploadPreset = 'hndzsvpa'

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const handleUpload = useCallback(
    (result: any) => {
      console.log(result.info.secure_url)
      onChange(result.info.secure_url)
    },
    [onChange]
  )

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        const onClick = () => {
          open?.()
        }
        return (
          <div
            onClick={onClick}
            className="
        relative
        cursor-pointer
        hover:opacity-70
        transition
        border-dashed
        border-2
        p-20
        border-neutral-300
        flex
        flex-col
        justify-center
        items-center
        gap-4
        text-neutral-600
      "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="House"
                  fill
                  src={value}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}
export default ImageUpload
