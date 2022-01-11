//筛选条件配置
/**
 * 配置说明
 * {
        label: "", //显示标签
        placeholder:"" //占位文字
        field: "", //字段名
        type: "", //输入框类型
        options: ()=>{}, //选项框
    }
*/
import options from "./options.js";
let filters = {
    group: {
        label: "",
        placeholder: i18n.t("jobtype.filters.placeholder.group"),
        field: "group",
        type: 2,
        options: ()=>{return options.group;}
    },
    name: {
        label: "",
        placeholder: i18n.t("jobtype.filters.placeholder.name"),
        field: "name",
        type: 1,
    },
}

export default filters;