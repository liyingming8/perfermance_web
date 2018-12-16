/*设置cookie*/
export function setCookie(c_name,value,expire) {
  var date=new Date()
  date.setSeconds(date.getSeconds()+expire)
  document.cookie=c_name+ "="+escape(value)+"; expires="+date.toGMTString()
}


/*获取cookie*/
export function getCookie(c_name){
  var arr, reg = new RegExp("(^| )" + c_name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return c_name+"="+(arr[2]);
  else
    return null;
}


/*删除cookie*/
export function delCookie(c_name){
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(c_name);
  if (cval != null)
    document.cookie = c_name + "=" + cval + ";expires=" + exp.toGMTString();
}
