import React from 'react'
import { ComponentStyleType } from '../component.d'

export type EInputProps = React.InputHTMLAttributes<Element> &
  Partial<ComponentStyleType> & {
    addonBefore?: string
  }

const EInput: React.FC<EInputProps> = props => {
  const { className: extraClassName, style, addonBefore } = props

  return (
    <div style={style} className={`mt-1 flex rounded-md shadow-sm ${extraClassName}`}>
      <span className='inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500'>
        {addonBefore}
      </span>
      <input
        {...props}
        className='block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm req'
      />
    </div>
  )
}

export default EInput
