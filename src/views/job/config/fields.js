//字段配置
/**
 * 配置说明
 * {
        name: "", //显示名称
        field: "", //字段名
        show: false, //是否显示，默认true
        table: {
            show: true, //表格栏：是否显示，默认true
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

import options from "./options.js";

let fields = {
    id: {
        name: i18n.t("normal.fields.id"),
        field: "id",
        table: {
        },
        form: {
            show: false,
            edit:{
                show: true,
                disabled: true,
            }
        }
    },
    type: {
        name: i18n.t("job.fields.type"),
        field: "type",
        table: {
            formatter: (r,c) => { }
        },
        form: {
            type: 3,
            options: () => { }
        }
    },
    top: {
        name: i18n.t("job.fields.ttopype"),
        field: "top",
        table: {
            formatter: (r,c) => {return r["top"] ? i18n.t("format.def.enable") : "";}
        },
        form: {
            type: 3,
            options: () => { return options.top;}
        }
    },
    title: {
        name: i18n.t("job.fields.title"),
        field: "title",
        table: {
        },
        form: {
            type: 1,
        }
    },
    date: {
        name: i18n.t("job.fields.date"),
        field: "date",
        table: {
        },
        form: {
            show: false,
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
    sort: {
        name: i18n.t("normal.fields.sort"),
        field: "sort",
        table: {
        },
        form: {
            type: 1,
        }
    },
}

export default fields;