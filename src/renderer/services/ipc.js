import { ipcRenderer } from 'electron'

/* TokenStore sends messages to get/set tokens on the keychain via the main process. */
class TokenStore {
  static getToken () {
    return ipcRenderer.sendSync('keychain-get-token', 'gh')
  }
  static setToken (token) {
    const msg = { key: 'gh', token }
    ipcRenderer.send('keychain-set-token', msg)
  }
  static deleteToken () {
    ipcRenderer.send('keychain-delete-token', 'gh')
  }
}

class APIServer {
  static start (token) {
    return new Promise(resolve => {
      ipcRenderer.once('server-started', () => {
        resolve()
      })
      ipcRenderer.send('server-start', token)
    })
  }
  static stop () {
    return ipcRenderer.sendSync('server-stop')
  }
}

export {
  TokenStore,
  APIServer
}
