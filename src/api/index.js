import qs from 'qs'
import axios from 'axios'
import {Message, MessageBox} from 'element-ui'

let axiosQuery = axios.create(); //查询
let axiosOperate = axios.create(); //操作

let requestFulfilled = function (config) {
    if(config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    //header token
    let token = localStorage.getItem(window.e.tokenName);
    if(token){
        config.headers[window.e.tokenName] = token;
    }
    return config;
};

let requestRejected = function (error) {
    return Promise.reject(error);
};

axiosQuery.interceptors.request.use(requestFulfilled, requestRejected);
axiosOperate.interceptors.request.use(requestFulfilled, requestRejected);

let responseFulfilled = function (response, isShowSuccess, isShowFailed) {
    let res = response.data;
    if(!res){
        return res;
    }
    //成功
    if(res.code === 1){
        if(isShowSuccess){
            Message({
                message: i18n.t('res.message.success'),
                type: 'success'
            });
        }
        return res;
    }
    //失败
    if(res.code === -2203 || res.code === -2301) {//重新登录 -111:未登录; -2301:已过期;
        MessageBox.alert(i18n.t('relogin.message'), i18n.t('relogin.title'), {
            confirmButtonText: i18n.t('dialog.confirm'),
            type: 'warning'
        }).then(() => {
            window.sessionStorage.removeItem('user');
            window.location.href = window.e.page.base + window.e.page.login;
        }).catch(() => {

        });
    }else if(res.code === -2204){ //没权限
        Message({
            message: i18n.t('res.message.noAuth'),
            type: 'warning'
        });
    }else{
        if(isShowFailed){
            // Message({
            //     message: i18n.t('res.message.failed') + '：' + res.code + ' -- ' + res.msg,
            //     type: 'warning'
            // });
            Message({
                message: res.msg,
                type: 'warning'
            });
        }
    }
    return res;
};

let responseRejected =  function (error) {
    let code = error.response ? error.response.status : '';
    let msg = error.response ? error.response.statusText : error;
    Message({
        message: i18n.t('res.message.error') + '：' + (code ? code + ' -- ' + msg : msg),
        type: 'error'
    });
    return Promise.reject(error);
};

axiosQuery.interceptors.response.use((response) => responseFulfilled(response, false, true), responseRejected);
axiosOperate.interceptors.response.use((response) => responseFulfilled(response, true, true), responseRejected);

let handleRes = (res) => {
    if(res.code === 1){
        return Promise.resolve(res);
    }else{
        return Promise.reject(res);
    }
}

//header
export const ADD_HEADER = (key, value) => {
    axiosQuery.defaults.headers[key] = value;
    axiosOperate.defaults.headers[key] = value;
}
//user
export const USER_LOGIN = (params) => {
    return axiosOperate.post(`/api/user/login`, params).then(handleRes);
}
export const USER_LOGOUT = (params) => {
    return axiosOperate.post(`/api/user/logout`, params).then(handleRes);
}
export const USER_ISLOGIN = (params) => {
    return axiosQuery.post(`/api/user/islogin`, params).then(handleRes);
}
export const USER_CHANGE_PWD = (params) => {
    return axiosOperate.post(`/api/user/changePwd`, params).then(handleRes);
}
export const USER_RESET_PWD = (params) => {
    return axiosOperate.post(`/api/user/resetPwd`, params).then(handleRes);
}
export const USER_LIST = (params) => {
    return axiosQuery.post(`/api/user/findPage`, params).then(handleRes);
}
export const USER_ONE = (params) => {
    return axiosQuery.post(`/api/user/findOne`, params).then(handleRes);
}
export const USER_ADD = (params) => {
    return axiosOperate.post(`/api/user/add`, params).then(handleRes);
}
export const USER_EDIT = (params) => {
    return axiosOperate.post(`/api/user/update`, params).then(handleRes);
}
export const USER_DEL = (params) => {
    return axiosOperate.post(`/api/user/delete`, params).then(handleRes);
}
//auth
export const USER_AUTH = () => {
    return axiosQuery.post(`/api/auth/userAuth`).then(handleRes);
}
export const AUTH_MENU = (params) => {
    return axiosQuery.post(`/api/auth/userMenu`, params).then(handleRes);
}
export const AUTH_MENU_UPDATE = (params) => {
    return axiosQuery.post(`/api/auth/updateUserMenu`, params).then(handleRes);
}


//job type
export const JOB_TYPE_LIST = (params) => {
    return axiosQuery.post(`/api/jobType/findPage`, params).then(handleRes);
}
export const JOB_TYPE_ONE = (params) => {
    return axiosQuery.post(`/api/jobType/findOne`, params).then(handleRes);
}
export const JOB_TYPE_ALL = (params) => {
    return axiosQuery.post(`/api/jobType/findAll`, params).then(handleRes);
}
export const JOB_TYPE_ADD = (params) => {
    return axiosOperate.post(`/api/jobType/add`, params).then(handleRes);
}
export const JOB_TYPE_EDIT = (params) => {
    return axiosOperate.post(`/api/jobType/update`, params).then(handleRes);
}
export const JOB_TYPE_DEL = (params) => {
    return axiosOperate.post(`/api/jobType/delete`, params).then(handleRes);
}

//job
export const JOB_LIST = (params) => {
    return axiosQuery.post(`/api/job/findPage`, params).then(handleRes);
}
export const JOB_ONE = (params) => {
    return axiosQuery.post(`/api/job/findOne`, params).then(handleRes);
}
export const JOB_ADD = (params) => {
    return axiosOperate.post(`/api/job/add`, params).then(handleRes);
}
export const JOB_EDIT = (params) => {
    return axiosOperate.post(`/api/job/update`, params).then(handleRes);
}
export const JOB_DEL = (params) => {
    return axiosOperate.post(`/api/job/delete`, params).then(handleRes);
}
