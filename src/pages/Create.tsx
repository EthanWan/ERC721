import React, { useState } from 'react'
import { NFTStorage, File as NFTFile } from 'nft.storage'
import message from '../components/EToast'
import EImageUpload from '../components/EImageUpload'

interface FormState {
  image: File | null // storage to IPFS
  name: string
  externalLink?: string
  description?: string
  supply: number
}

function Create() {
  const [values, setValues] = useState<FormState>({
    image: null,
    name: '',
    supply: 1,
  })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`${NFT_STORAGE_KEY}`)
    const client = new NFTStorage({ token: NFT_STORAGE_KEY })
    console.log('client:', client)
    const metadata = await client.store({
      name: 'NFT',
      description: `ethan's NFT !`,
      image: new NFTFile([values.image!], values.image!.name, {
        type: values.image!.type,
      }),
    })
    console.log('metadata: ', metadata)
    message.success('Image store to IPFS', 2000)
  }

  const onFileChange = (file: File) => {
    console.log(file)
    setValues({
      ...values,
      image: file,
    })
  }

  return (
    <>
      <div className='flex justify-center my-4'>
        <div className='mt-5 md:mt-0 md:w-5/12'>
          <form onSubmit={submit}>
            <div className='sm:overflow-hidden sm:rounded-md'>
              <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                <div>
                  <label className="after:content-['*'] after:ml-0.5 after:text-red-500 after:font-medium block text-lg font-bold text-gray-700">
                    Image
                  </label>
                  <EImageUpload maxSize={10} onChange={onFileChange} />
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
