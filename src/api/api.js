import request from '@/utils/request'

export default {
  getUser (id) { return request.get(`/user/${id}`) },
  async getMyUserData () {
    return request.get('/user/stats')
  }
}
