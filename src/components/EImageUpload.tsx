import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import message from '../components/EToast'

type ImageSuffix = 'jpg' | 'jpeg' | 'png' | 'gif'

interface ImageUploadProps {
  maxSize: number
  suffix?: ImageSuffix[]
  subTitle?: string | React.ReactNode
  onChange: (file: File) => void
}

const EImageUpload = (props: ImageUploadProps) => {
  const { maxSize, suffix = ['jpg', 'jpeg', 'png', 'gif'], subTitle, onChange } = props
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    fileHandler(e.target.files)
  }

  const onFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    fileHandler(e.dataTransfer.files)
  }

  const fileHandler = (files: FileList | null) => {
    if (!files && files!.length === 0) return
    const file = files![0]
    const name = file.name
    const fileSuffix = name
      .substring(name.lastIndexOf('.') + 1)
      .toLowerCase() as ImageSuffix

    if (!suffix.includes(fileSuffix)) {
      message.warning(`The file must have suffix wiht ${suffix.join(', ').toUpperCase()}`)
      return false
    }

    let fileSize = 0
    fileSize = file.size
    const size = fileSize / 1024
    if (size > maxSize * 1000) {
      message.warning(`Image size over ${maxSize}M`)
      return false
    }

    const reader = new FileReader()
    reader.readAsDataURL(file as Blob)
    reader.onload = (e: ProgressEvent<FileReader>) => {
      setPreviewImage(e.target!.result as string)
    }
    onChange(file)
  }

  return (
    <div className='mt-1 rounded-2xl border-2 border-dashed border-gray-300 p-2'>
      {previewImage ? (
        <div className='relative'>
          <XMarkIcon
            className='h-5 w-5 absolute top-2 right-2 text-slate-700 font-bold cursor-pointer'
            onClick={() => {
              setPreviewImage(null)
            }}
          />
          <img className='rounded-2xl' src={previewImage} />
        </div>
      ) : (
        <label
          htmlFor='file-upload'
          onDragEnter={e => {
            e.preventDefault()
          }}
          onDragOver={e => {
            e.preventDefault()
          }}
          onDrop={onFileDrop}
          className='cursor-pointer flex justify-center'
        >
          <div className='w-full flex justify-center rounded-2xl hover:bg-gray-300 py-3'>
            <div className='space-y-1 text-center '>
              <svg
                className='mx-auto h-12 w-12 text-gray-400'
                stroke='currentColor'
                fill='none'
                viewBox='0 0 48 48'
                aria-hidden='true'
              >
                <path
                  d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <div className='flex text-sm text-gray-600'>
                <label className='cursor-pointer bg-transparent relative rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none'>
                  <span>Upload a file</span>
                  <input
                    id='file-upload'
                    name='file-upload'
                    type='file'
                    className='sr-only'
                    onChange={onFileChange}
                  />
                </label>
                <p className='pl-1'>or drag and drop</p>
              </div>
              <p className='text-xs text-gray-500'>
                {subTitle
                  ? subTitle
                  : `${suffix.join(', ').toUpperCase()} up to ${maxSize}MB`}
              </p>
            </div>
          </div>
        </label>
      )}
    </div>
  )
}

export default EImageUpload
