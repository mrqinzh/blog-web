import request from '@/utils/request'

export function loginPage(currentPage, pageSize, condition) {
  let url = `/login/log/page?pageNum=${currentPage}&pageSize=${pageSize}&condition=${condition}`;
  return request({
    url: url,
    method: 'get'
  })
}
