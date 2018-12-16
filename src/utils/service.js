
 export const baseInfo={

  // 远程：
  // baseURL: 'http://10.4.0.190:8081',
  // 本地：
  // baseURL: 'http://127.0.0.1:8081',
  //动态获取ip
  baseURL: 'http://'+window.location.host,
  // test li
  // baseURL:'http://10.5.135.148:8081',

  // baseURL:'http://10.5.135.148:8081/Byd_Performance',
  // test xiao
  // baseURL:'http://10.4.16.37:8081',
  // test Tian
  // baseURL:'http://10.4.16.42:8081',


  //设置默认请求头，使post请求发送的是formdata格式数据// axios的header默认的Content-Type好像是'application/json;charset=UTF-8',我的项目都是用json格式传输，如果需要更改的话，可以用这种方式修改
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  timeout: 5000, // 请求的超时时间
  withCredentials: true // 允许携带cookie

}



