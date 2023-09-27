import request from '@/utils/request'

export function getCRL(enkey,eniv) {
    return request({
      url: '/crl/getcrl',
      method: 'get',
      params: { enkey,eniv }
    })
  }