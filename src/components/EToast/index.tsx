import ReactDOM from 'react-dom/client'
import { useRef } from 'react'
import Toast from './Toast'
import type { VoidFunc, NoticeProps, ToastRef } from './Toast'

type ToastNotic = (content: string, duration: number, onClose: VoidFunc) => void

interface Message {
  info: ToastNotic
  success: ToastNotic
  error: ToastNotic
}

type ToastResult = ToastRef & {
  destroy: VoidFunc
}

function createToast(): ToastResult {
  const div = document.createElement('div')
  document.body.appendChild(div)

  const toast = ReactDOM.createRoot(div as HTMLElement)
  // eslint-disable-next-line
  const toastRef = useRef<ToastRef>(null)
  toast.render(<Toast ref={toastRef} />)

  return {
    addNotice(notice: NoticeProps) {
      return toastRef.current?.addNotice(notice)
    },
    destroy() {
      toast.unmount()
      document.body.removeChild(div)
    },
  }
}

const message: Message = {
  info: (content, duration, onClose) => {
    return notice('info', content, duration, onClose)
  },
  success: (content, duration, onClose) => {
    return notice('success', content, duration, onClose)
  },
  error: (content, duration, onClose) => {
    return notice('error', content, duration, onClose)
  },
}

let toast: ToastResult

function notice(
  type: string,
  content: string,
  duration: number,
  onClose: VoidFunc
): void {
  if (!toast) toast = createToast()
  return toast.addNotice({ type, content, duration, onClose })
}

export default message
