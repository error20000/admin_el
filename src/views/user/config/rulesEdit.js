//有效性配置
let rules = {
    username: [
        { required: true, message: i18n.t('user.rules.username'), trigger: 'blur' },
    ],
    nick: [
        { required: true, message: i18n.t('user.rules.nick'), trigger: 'blur' },
    ],
}

export default rules;