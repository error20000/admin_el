//有效性配置
let rules = {
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
}

export default rules;