import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import useIpfsFactory from '../hooks/useIpfsFactory'
import message from '../components/EToast'

interface FormState {
  image: string // storage to IPFS
  name: string
  externalLink?: string
  description?: string
  supply: number
}

function Create() {
  const [values, setValues] = useState<FormState>({
    image: '',
    name: '',
    supply: 1,
  })
  const { ipfs, isIpfsReady } = useIpfsFactory()

  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isIpfsReady) {
      const res = await ipfs!.add(values.image)
      console.log('image: ', res)
      message.success('Image store to IPFS', 2000)
    }
  }

  return (
    <>
      <div className='flex justify-center mt-4'>
        <div className='mt-5 md:mt-0 md:w-5/12'>
          <form onSubmit={submit}>
            <div className='sm:overflow-hidden sm:rounded-md'>
              <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                <div>
                  <label className="after:content-['*'] after:ml-0.5 after:text-red-500 after:font-medium block text-lg font-bold text-gray-700">
                    Image
                  </label>
                  {previewImage ? (
                    <div className='relative mt-1 rounded-2xl border-2 border-dashed border-gray-300 p-2'>
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
                      className='cursor-pointer mt-1 flex justify-center rounded-2xl border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'
                    >
                      <div className='space-y-1 text-center'>
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
                          <label className='cursor-pointer relative rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none'>
                            <span>Upload a file</span>
                            <input
                              id='file-upload'
                              name='file-upload'
                              type='file'
                              accept='image/*'
                              className='sr-only'
                              onChange={e => {
                                console.log(e.target.files)
                                const file = e.target.files && e.target.files[0]
                                const reader = new FileReader()
                                reader.readAsDataURL(file as Blob)

                                reader.onload = (e: any) => {
                                  setPreviewImage(e.target.result)
                                }
                                const name = e.target.value
                                const fileName = name
                                  .substring(name.lastIndexOf('.') + 1)
                                  .toLowerCase()
                                if (
                                  fileName != 'jpg' &&
                                  fileName != 'jpeg' &&
                                  fileName != 'png' &&
                                  fileName != 'gif'
                                ) {
                                  // show message
                                  e.target.value = ''
                                  return false
                                }
                                let fileSize = 0
                                fileSize =
                                  e.target.files &&
                                  Array.isArray(e.target.files) &&
                                  e.target.files[0].size
                                const size = fileSize / 1024
                                if (size > 10000) {
                                  // show message
                                  e.target.value = ''
                                  return false
                                }
                              }}
                            />
                          </label>
                          <p className='pl-1'>or drag and drop</p>
                        </div>
                        <p className='text-xs text-gray-500'>
                          PNG, JPG, JPEG, GIF up to 10MB
                        </p>
                      </div>
                    </label>
                  )}
                </div>

                <div className='col-span-3 sm:col-span-2'>
                  <label
                    htmlFor='company-website'
                    className="after:content-['*'] after:ml-0.5 after:text-red-500 after:font-medium block text-lg font-bold text-gray-700"
                  >
                    Name
                  </label>
                  <div className='mt-1 flex rounded-md shadow-sm'>
                    <input
                      required
                      type='text'
                      value={values.name}
                      onChange={e => {
                        setValues({
                          ...values,
                          name: e.target.value,
                        })
                      }}
                      name='company-website'
                      id='company-website'
                      className='block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm req'
                      placeholder='NFT name'
                    />
                  </div>
                </div>

                <div className='col-span-3 sm:col-span-2'>
                  <label
                    htmlFor='company-website'
                    className='block text-lg font-bold text-gray-700'
                  >
                    External link
                  </label>
                  <div className='mt-1 flex rounded-md shadow-sm'>
                    <span className='inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500'>
                      https://
                    </span>
                    <input
                      type='text'
                      name='company-website'
                      value={values.externalLink}
                      onChange={e => {
                        setValues({
                          ...values,
                          externalLink: e.target.value,
                        })
                      }}
                      id='company-website'
                      className='block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      placeholder='www.example.com'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='about'
                    className='block text-lg font-bold text-gray-700'
                  >
                    Description
                  </label>
                  <div className='mt-1'>
                    <textarea
                      value={values.description}
                      onChange={e => {
                        setValues({
                          ...values,
                          description: e.target.value,
                        })
                      }}
                      id='about'
                      name='about'
                      rows={3}
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      placeholder='Provide a detailed description of you NFT.'
                      defaultValue={''}
                    />
                  </div>
                  <p className='mt-2 text-sm text-gray-500'>
                    Brief description for your profile. URLs are hyperlinked.
                  </p>
                </div>

                <div className='col-span-3 sm:col-span-2'>
                  <label
                    htmlFor='company-website'
                    className='block text-lg font-bold text-gray-700'
                  >
                    Supply
                  </label>
                  <div className='mt-1 flex rounded-md shadow-sm'>
                    <input
                      value={values.supply}
                      onChange={e => {
                        setValues({
                          ...values,
                          supply: Number(e.target.value),
                        })
                      }}
                      type='text'
                      name='company-website'
                      id='company-website'
                      className='block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      placeholder='Max supply'
                    />
                  </div>
                </div>
              </div>
              <div className='w-full px-4 py-3 text-left sm:px-6'>
                <button
                  type='submit'
                  className='w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Mint
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Create
