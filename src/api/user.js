import Axios from 'axios'
import env from '../../env.json'

export function loginWithEmail (username, password) {
  return Axios.post(env.MATATAKIAPI + '/login/account', { username, password })
}

export function getUserProfile (uid) {
  return Axios.get(env.MATATAKIAPI + `/user/${uid}`)
}

export function getAvatarUrl (location) {
  const imageCDNServer = env.MTTKIMGCDN
  return `${imageCDNServer}${location}`
}
