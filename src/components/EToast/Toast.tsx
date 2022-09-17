import { Transition } from '@headlessui/react'
import { useState, useImperativeHandle, forwardRef } from 'react'

export type VoidFunc = () => void

export interface NoticeProps {
  key?: string
  type: string
  content: string
  duration: number
  onClose?: VoidFunc
}

type ToastProps = {}

export type ToastRef = {
  addNotice: (notice: NoticeProps) => void
}

const leaveAnimationTime = 200

const Toast: React.ForwardRefRenderFunction<ToastRef, ToastProps> = (_, ref) => {
  const [notices, setNotices] = useState<NoticeProps[]>([])
  const [show, setShow] = useState<boolean>(false)

  const noticeKey = () => {
    return `notice-${new Date().getTime()}-${notices.length}`
  }

  useImperativeHandle(ref, () => ({
    addNotice: (notice: NoticeProps): VoidFunc => {
      notice.key = noticeKey()
      notices[0] = notice

      setNotices(notices)
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

  const removeNotice = (key: string) => {
    setNotices(
      notices.filter(async notice => {
        if (notice.key === key) {
          setShow(false)
          await new Promise(resolve => {
            setTimeout(resolve, leaveAnimationTime)
          })
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
          show={show}
          enter='transform transition duration-[400ms]'
          enterFrom='opacity-0 rotate-[-120deg] scale-50'
          enterTo='opacity-100 rotate-0 scale-100'
          leave={`transform duration-${leaveAnimationTime} transition ease-in-out`}
          leaveFrom='opacity-100 rotate-0 scale-100 '
          leaveTo='opacity-0 scale-95 '
        >
          <div className='p-2 text-center'>
            <div className='inline-block py-2.5 px-4 text-white rounded pointer-events-auto shadow-md'>
              <div>image</div>
              <div>{notice.content}</div>
            </div>
          </div>
        </Transition>
      ))}
    </div>
  )
}

export default forwardRef(Toast)
