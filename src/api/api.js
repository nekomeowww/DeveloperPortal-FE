import Axios from 'axios'

import env from '../../env.json'

export default {
  uploadImage (data, id, userId) {
    console.log(id)
    console.log(userId)
    const url = env.DEVELOPERAPI + '/user/' + userId + '/app/' + id + '/uploadAppIcon'
    const formdata = new FormData()
    formdata.append('image', data)
    return Axios({
      method: 'POST',
      url: url,
      data: formdata
    })
  }
}
