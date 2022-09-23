import React from 'react'
import { ComponentStyleType } from '../component.d'

export type ETextAreaProps = React.TextareaHTMLAttributes<Element> &
  Partial<ComponentStyleType>

const ETextArea: React.FC<ETextAreaProps> = props => {
  return (
    <div className='mt-1'>
      <textarea
        {...props}
        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
      />
    </div>
  )
}

export default ETextArea
