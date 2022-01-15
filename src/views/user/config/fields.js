//字段配置
/**
 * 配置说明
 * {
        name: "", //显示名称
        field: "", //字段名
        show: false, //是否显示，默认true
        table: {
            show: true, //表格栏：是否显示，默认true
            sortable: true, //表格栏：远程排序，默认false
            width: "", //表格栏：宽度
            fixed: "", //表格栏：固定
            formatter: ()=>{} //表格栏：格式化
        },
        form: {
            show: true, //表单栏：是否显示，默认true
            disabled: false,  //表单栏：是否可编辑，默认可编辑
            type: "", //表单栏：输入框类型
            placeholder: "", //表单栏：占位文字
            options: ()=>{}, //表单栏：选项框
            uploadUrl: "", //表单栏：上传url
            add:{		
                show: true, //表单栏：是否显示，默认true
                disabled: false,  //表单栏：是否可编辑，默认可编辑
            }, ...edit,view
        }
    }
*/
let fields = {
    id: {
        name: i18n.t("normal.fields.id"),
        field: "id",
        table: {
            sortable: true
        },
        form: {
            show: false,
            edit:{
                show: true,
                disabled: true,
            }
        }
    },
    username: {
        name: i18n.t("user.fields.username"),
        field: "username",
        table: {
        },
        form: {
            type: 1,
        }
    },
    password: {
        name: i18n.t("user.fields.password"),
        field: "password",
        table: {
            show: false,
        },
        form: {
            show: false,
            type: 2,
            add:{
                show: true,
            }
        }
    },
    password2: {
        name: i18n.t("user.fields.password2"),
        field: "password2",
        table: {
            show: false,
        },
        form: {
            show: false,
            type: 2,
            add:{
                show: true,
            }
        }
    },
    nick: {
        name: i18n.t("user.fields.nick"),
        field: "nick",
        table: {
        },
        form: {
            type: 1,
        }
    },
    status: {
        name: i18n.t("normal.fields.status"),
        field: "status",
        table: {
            formatter: (r,c) => {return r["status"] ? i18n.t("format.status.enable") : i18n.t("format.status.disable");}
        },
        form: {
            type: 4,
        }
    },
    admin: {
        name: i18n.t("user.fields.admin"),
        field: "admin",
        table: {
            formatter: (r,c) => {return r["admin"] ? i18n.t("format.admin.enable") : i18n.t("format.admin.disable");}
        },
        form: {
            type: 4,
        }
    },
}

export default fields;