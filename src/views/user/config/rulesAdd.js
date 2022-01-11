//有效性配置
let rules = {
    username: [
        { required: true, message: i18n.t('user.rules.username'), trigger: 'blur' },
    ],
    password: [
        { required: true, message: i18n.t('pwd.rules.pwd'), trigger: 'blur' },
        { validator: (rule, value, callback) => {
            if (window.e.pwd.reg && !window.e.pwd.reg.test(value) ) {
                callback(new Error(i18n.t('pwd.rules.format')+i18n.t('pwd.regTips')));
            } else {
                callback();
            }
        }, trigger: 'blur' }
    ],
    nick: [
        { required: true, message: i18n.t('user.rules.nick'), trigger: 'blur' },
    ],
}

export default rules;