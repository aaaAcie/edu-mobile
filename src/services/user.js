import request from '@/utils/request'
import qs from 'qs'

// login
export const getLogin = data => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    data: qs.stringify(data)
  })
}

// getInfo
export const getInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}
