import request from '@/utils/request'

export function getmycer(enusername,enkey,eniv) {
  return request({
    url: '/cer/mycer',
    method: 'get',
    params: { enusername,enkey,eniv }
  })
}
export function getcer(enid,enkey,eniv) {
    return request({
      url: '/cer/getcer',
      method: 'get',
      params: { enid,enkey,eniv }
    })
  }
export function applycer(encer,enkey,eniv){
    return request({
      url: '/apply/a',
      method:'get',
      params: { encer,enkey,eniv }
    })

}
export function cancelcer(encer,enkey,eniv){
  return request({
    url: '/cancel/b',
    method:'get',
    params: {  encer,enkey,eniv }
  })

}


