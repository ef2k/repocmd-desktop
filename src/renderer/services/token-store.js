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

export default TokenStore
