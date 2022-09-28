// import type { EItemProps } from './EItem'
import React from 'react'

export interface EForm<T> {
  name: string
  initialValues: T
  onFinish: (values: T) => void
  children: React.ReactNode[]
}

const EForm: React.FC<Partial<EForm<unknown>>> = props => {
  const { children, onFinish } = props

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (onFinish) {
      onFinish({})
    }
  }

  const onItemChange = (label: string, e: React.ChangeEvent) => {
    console.log(label, e)
  }

  return (
    <form onSubmit={submit}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          const { props } = child
          return React.cloneElement(child, {
            ...props,
            onChange: onItemChange,
          })
        }
        return null
      })}
    </form>
  )
}

export default EForm
