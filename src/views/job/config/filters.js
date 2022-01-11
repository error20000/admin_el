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
    type: {
        label: "",
        placeholder: i18n.t("job.filters.placeholder.type"),
        field: "type",
        type: 2,
        options: () => { }
    },
    top: {
        label: "",
        placeholder: i18n.t("job.filters.placeholder.top"),
        field: "top",
        type: 2,
        options: () => { return options.top;}
    },
    keywords: {
        label: "",
        placeholder: i18n.t("job.filters.placeholder.keywords"),
        field: "keywords",
        type: 1,
    },
}

export default filters;