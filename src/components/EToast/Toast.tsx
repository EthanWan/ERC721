import { useState } from 'react'

export type VoidFunc = () => void

export interface NoticeProps {
  key?: string
  type: string
  content: string
  duration: number
  onClose: VoidFunc
}

interface ToastProps {
  destroy: VoidFunc
}

function Toast(props: ToastProps) {
  const { destroy } = props
  const [notices, setNotices] = useState<NoticeProps[]>([])

  const noticeKey = () => {
    return `notice-${new Date().getTime()}-${notices.length}`
  }

  const addNotice = (notice: NoticeProps): VoidFunc => {
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
  }

  const removeNotice = (key: string) => {
    setNotices(
      notices.filter(notice => {
        if (notice.key === key) {
          if (notice.onClose) setTimeout(notice.onClose, 300) // animation time
          return false
        }
        return true
      })
    )
  }

  return (
    <div>
      {notices.map(notice => (
        <div key={notice.key}>
          <div>
            <div></div>
            <div>{notice.content}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Toast
