function request(obj) {
  let url = obj.url || '';
  url = 'https://www.zhengzhicheng.cn' + url;
  let method = obj.method || 'get';
  let data = obj.data || {};

  return new Promise(function(resolve, rejected) {
    mpvue.request({
      url: url,
      method: method,
      data: data,
      success: function(info) {
        resolve(info.data);
      }
    })
  })
}

export default request;
