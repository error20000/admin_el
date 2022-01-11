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
let filters = {
    username: {
        label: "",
        placeholder: i18n.t("user.filters.placeholder.username"),
        field: "username",
        type: 1,
    },
    nick: {
        label: "",
        placeholder: i18n.t("user.filters.placeholder.nick"),
        field: "nick",
        type: 1,
    },
}

export default filters;