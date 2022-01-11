 //获取cookie、
function getCookie(name) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return (arr[2]);
    else
      return null;
}
  
  //设置cookie,增加到vue实例方便全局调用
function setCookie (name, value, expiredays) {
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};
  
  //删除cookie
function delCookie (name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let val = getCookie(name);
    if (val != null)
        document.cookie = name + "=" + val + ";expires=" + exp.toGMTString();
  };

export default {
    install: function (Vue) {
      Vue.prototype.getCookie = getCookie;
      Vue.prototype.setCookie = setCookie;
      Vue.prototype.delCookie = delCookie;
    }
}
