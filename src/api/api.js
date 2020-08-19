import Axios from 'axios'

import env from '../../env.json'

export default {
  uploadImage (data, id, userId) {
    const url = env.DEVELOPERAPI + '/user/' + userId + '/app/' + id + '/uploadAppIcon'
    const formdata = new FormData()
    formdata.append('image', data)
    return Axios({
      method: 'POST',
      url: url,
      data: formdata
    })
  },
  uploadTeamImage (data, id, userId) {
    const url = env.DEVELOPERAPI + '/user/' + userId + '/team/' + id + '/uploadTeamIcon'
    const formdata = new FormData()
    formdata.append('image', data)
    return Axios({
      method: 'POST',
      url: url,
      data: formdata
    })
  },
  uploadTeamAppImage (data, id, userId, appId) {
    const url = env.DEVELOPERAPI + '/user/' + userId + '/team/' + id + '/app/' + appId + '/uploadTeamAppIcon'
    const formdata = new FormData()
    formdata.append('image', data)
    return Axios({
      method: 'POST',
      url: url,
      data: formdata
    })
  }
}
