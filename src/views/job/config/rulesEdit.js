//有效性配置
let rules = {
    type: [
        { required: true, message: i18n.t('job.rules.type'), trigger: 'change' },
    ],
    title: [
        { required: true, message: i18n.t('job.rules.title'), trigger: 'blur' },
    ],
    sort: [
        { required: true, message: i18n.t('job.rules.sort'), trigger: 'blur' },
        { validator: (rule, value, callback) => {
            if ( Number.isNaN(Number(value)) ) {
                callback(new Error(i18n.t('job.rules.number', {msg: i18n.t('normal.fields.sort')})) );
            } else {
                callback();
            }
        }, trigger: 'blur' }
    ],
}

export default rules;