function request(obj) {
  let url = obj.url || '';
  url = 'https://www.zhengzhicheng.cn' + url;
  let method = obj.method || 'get';
  let data = obj.data || {};

  return new Promise(function(resolve, rejected) {

    mpvue.showLoading({
      title: '正在加载...'
    })

    mpvue.request({
      url: url,
      method: method,
      data: data,
      success: function(info) {
        resolve(info.data);
        mpvue.hideLoading();
      }
    })
  })
}

export default request;
