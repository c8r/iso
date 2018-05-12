import path from 'path'
import log from 'electron-log'
// import Notif from 'node-mac-notifier'

const trigger = (title, options = {}) => {
  const notif = new Notification(title, options)
  if (typeof options.onClick === 'function') {
    notif.onclick = options.onClick
  }
}

export const push = (title, options) => {
  let granted = Notification.permission === 'granted'
  if (!granted) {
    Notification.requestPermission()
      .then(permission => {
        if (permission === 'granted') {
          granted = true
          trigger(title, options)
        }
      })
      .catch(err => {
        log.error(err)
      })
  } else {
    trigger(title, options)
  }
}

/*
export const push = (title, options = {}) => {
  const notif = new Notif(title, options)
}
*/

export default { push }
