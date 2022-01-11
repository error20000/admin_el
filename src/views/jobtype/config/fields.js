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
            type: 1,
            edit:{
                disabled: true,
            }
        }
    },
    group: {
        name: i18n.t("jobtype.fields.group"),
        field: "group",
        table: {
            formatter: (r,c) => {
                let format = r["group"];
                for(let i = 0; i < options.group.length; i++){
                    if(options.group[i].value == format){
                        return format = options.group[i].name;
                    }
                }
                return format;
            }
        },
        form: {
            type: 3,
            options: () => { return options.group;}
        }
    },
    name: {
        name: i18n.t("jobtype.fields.name"),
        field: "name",
        table: {
        },
        form: {
            type: 1,
        }
    },
    sort: {
        name: i18n.t("normal.fields.sort"),
        field: "sort",
        table: {
        },
        form: {
            type: 1,
            placeholder: "请输入数字序号"
        }
    },
    icon: {
        name: i18n.t("jobtype.fields.icon"),
        field: "icon",
        table: {
        },
        form: {
            type: 5,
            uploadUrl: "/api/file/uploadImg",
            placeholder: "上传图片，或输入http地址。"
        }
    },
}

export default fields;