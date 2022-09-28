import React, { useCallback, forwardRef, useImperativeHandle } from 'react'
import cls from 'classnames'

type EItemHTMElementType = HTMLTextAreaElement | HTMLInputElement

export interface EItemProps {
  label: string
  name: string
  required: boolean
  initialValue: string
  children: React.ReactNode
  onChange: (name: string, value: string) => void
}

const EItem: React.ForwardRefRenderFunction<{}, EItemProps> = (props, ref) => {
  const { label, children, required, name, initialValue, onChange } = props

  const onItemChange = useCallback(
    (e: React.ChangeEvent<EItemHTMElementType>) => {
      onChange(name, e.target.value)
    },
    [name, onChange]
  )

  useImperativeHandle(ref, () => ({
    // onChange: (e: React.ChangeEvent) => {
    //   console.log()
    // },
  }))

  return (
    <div>
      <label
        className={cls('block text-lg font-bold text-gray-700', {
          "after:content-['*'] after:ml-0.5 after:text-red-500 after:font-medium":
            required,
        })}
        htmlFor={name}
      >
        {label}
      </label>
      <div className=''>
        {React.cloneElement(React.Children.only(children) as React.ReactElement, {
          name,
          id: name,
          defaultValue: initialValue,
          onChange: onItemChange,
        })}
      </div>
    </div>
  )
}

export default forwardRef(EItem)
