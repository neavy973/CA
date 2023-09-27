import request from '@/utils/request'

export function login(enusername,enpasswd,enkey,eniv) {
  return request({
    url: '/user/login',
    method: 'get',
    params: { enusername,enpasswd,enkey,eniv }
  })
}

export function regisiter(enform,enkey,eniv) {
  return request({
    url: '/user/reg',
    method: 'get',
    params: { enform,enkey,eniv }
  })
}

export function getInfo(entoken,enkey,eniv) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { entoken,enkey,eniv }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

