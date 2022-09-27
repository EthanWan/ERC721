import React, { useCallback, forwardRef, useImperativeHandle } from 'react'
import cls from 'classnames'

export interface EItemProps {
  label: string
  name: string
  required: boolean
  initialValue: string
  children: React.ReactNode
}

const EItem: React.ForwardRefRenderFunction<{}, EItemProps> = (props, ref) => {
  const { label, children, required, name, initialValue } = props

  const onChange = useCallback((e: React.ChangeEvent) => {
    console.log(e)
  }, [])

  useImperativeHandle(ref, () => ({
    onChange: (e: React.ChangeEvent) => {
      console.log()
    },
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
      {React.cloneElement(
        <div className='' />,
        {
          name,
          id: name,
          defaultValue: initialValue,
          onChange: onChange,
        },
        children
      )}
    </div>
  )
}

export default forwardRef(EItem)
