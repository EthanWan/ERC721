import React, { useState } from 'react'

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

  const submit = (e: any) => {
    e.preventDefault()
    console.log('submit', values)
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
                  <div className='mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'>
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
                        <label
                          htmlFor='file-upload'
                          className='relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500'
                        >
                          <span>Upload a file</span>
                          <input
                            id='file-upload'
                            name='file-upload'
                            type='file'
                            className='sr-only'
                          />
                        </label>
                        <p className='pl-1'>or drag and drop</p>
                      </div>
                      <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
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
                      placeholder='Item name'
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
                      placeholder='Provide a detailed description of you item.'
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
