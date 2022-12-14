import { useState, useImperativeHandle, forwardRef, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import {
  ExclamationCircleIcon,
  XCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/20/solid'

export type VoidFunc = () => void

export type NoticeType = 'success' | 'info' | 'warning' | 'error'

export type NoticeProps = {
  key?: string
  type: NoticeType
  content: string
  duration: number
  onClose?: VoidFunc
}

type ToastProps = {}

export type ToastRef = {
  addNotice: (notice: NoticeProps) => void
}

const animationTime = 300
const Toast: React.ForwardRefRenderFunction<ToastRef, ToastProps> = (_, ref) => {
  const [notices, setNotices] = useState<NoticeProps[]>([])
  const [show, setShow] = useState<{ [key: string]: boolean }>({})

  const noticeKey = () => {
    return `notice-${new Date().getTime()}`
  }

  useEffect(() => {
    if (notices.length > 0) {
      setShow(prevState => {
        const newShow: { [key: string]: boolean } = {}
        const keys = Object.keys(prevState)
        notices.forEach(notice => {
          if (!keys.includes(notice.key!)) {
            newShow[notice.key!] = true
          }
        })
        return {
          ...prevState,
          ...newShow,
        }
      })
    }
  }, [notices])

  useImperativeHandle(ref, () => ({
    addNotice: (notice: NoticeProps): VoidFunc => {
      notice.key = noticeKey()
      setNotices(prevState => {
        return [...prevState, notice]
      })

      if (notice.duration > 0) {
        setTimeout(() => {
          removeNotice(notice.key!)
        }, notice.duration)
      }
      return () => {
        removeNotice(notice.key!)
      }
    },
  }))

  const removeNotice = async (key: string) => {
    setShow(prevState => {
      delete prevState[key]
      return {
        ...prevState,
      }
    })

    await new Promise(resolve => {
      setTimeout(resolve, animationTime)
    })

    setNotices(prevState =>
      prevState.filter(notice => {
        if (notice.key === key) {
          if (notice.onClose) notice.onClose
          return false
        }
        return true
      })
    )
  }

  return (
    <div className='z-50 box-border fixed text-white m-0 p-0 w-full left-0 top-2 text-sm tabular-nums pointer-events-none'>
      {notices.map(notice => (
        <Transition
          key={notice.key}
          show={show[notice.key!] || false}
          enter={`transition duration-${animationTime} ease-in-out`}
          enterFrom='opacity-0 translate-y-0'
          enterTo='opacity-100 translate-y-2'
          leave={`transition duration-${animationTime} ease-out-in`}
          leaveFrom='opacity-100 translate-y-2'
          leaveTo='opacity-0 translate-y-0'
        >
          <div className='p-2 text-center'>
            <div className='inline-block py-2.5 px-4 text-slate-700 rounded pointer-events-auto shadow-md bg-white'>
              <div className='flex items-center'>
                <div className='mr-2'>
                  <Icon type={notice.type} />
                </div>
                <div>{notice.content}</div>
              </div>
            </div>
          </div>
        </Transition>
      ))}
    </div>
  )
}

const Icon = (props: { type: NoticeType }) => {
  switch (props.type) {
    case 'info':
      return <ExclamationCircleIcon className='h-5 w-5 text-blue-500' />
    case 'success':
      return <CheckCircleIcon className='h-5 w-5 text-green-500' />
    case 'error':
      return <XCircleIcon className='h-5 w-5 text-red-500' />
    case 'warning':
      return <ExclamationCircleIcon className='h-5 w-5 text-yellow-500' />
    default:
      return <ExclamationCircleIcon className='h-5 w-5 text-blue-500' />
  }
}

export default forwardRef(Toast)
