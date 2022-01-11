//有效性配置
let rules = {
    id: [
        { required: true, message: i18n.t('jobtype.rules.id'), trigger: 'blur' },
        { validator: (rule, value, callback) => {
            if ( Number.isNaN(Number(value)) ) {
                callback(new Error(i18n.t('jobtype.rules.number', {msg: i18n.t('normal.fields.id')})) );
            } else {
                callback();
            }
        }, trigger: 'blur' }
    ],
    group: [
        { required: true, message: i18n.t('jobtype.rules.group'), trigger: 'blur' },
    ],
    name: [
        { required: true, message: i18n.t('jobtype.rules.name'), trigger: 'blur' },
    ],
    sort: [
        { required: true, message: i18n.t('jobtype.rules.sort'), trigger: 'blur' },
        { validator: (rule, value, callback) => {
            if ( Number.isNaN(Number(value)) ) {
                callback(new Error(i18n.t('jobtype.rules.number', {msg: i18n.t('normal.fields.sort')})) );
            } else {
                callback();
            }
        }, trigger: 'blur' }
    ],
}

export default rules;