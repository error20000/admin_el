
const zhCN = require('element-ui/lib/locale/lang/zh-CN');

const zh = Object.assign({
    name: "中文",
    sysName: "后台管理",
    res:{
        message: {
            success: "成功",
            unLoin: "未登录",
            loginTimeout: "登录已过期",
            noAuth: "没有权限.",
            failed: "失败",
        }
    },
    label: {
        filter: "筛选",
        result: "结果",
        action: "操作",
        title: {
            query: "查询",
            reset: "重置",
            import: "导入",
            export: "导出",
            add: "新增",
            edit: "编辑",
            view: "查看",
            del: "删除",
            batchDel: "批量删除",
            upload: "上传",
        }
    },
    pwd: {
        regTips: "（密码包含 数字和英文，长度6-20）",
        form: {
            oldPwd: "旧密码",
            newPwd: "新密码",
            newPwd2: "确认新密码",
            pwd: "密码",
            pwd2: "确认密码",
        },
        rules: {
            oldPwd: "请输入旧密码",
            newPwd: "请输入新密码",
            newPwd2: "请再次输入新密码",
            same: "两次输入密码不一致!",
            format: "密码格式不正确!",
            pwd: "请输入密码",
            pwd2: "请再次输入密码",
        }
    },
    dialog: {
        close: "关闭",
        cancel: "取消",
        submit: "提交", 
        confirm: "确定",
    },
    confirm:{
        title: "提示",
        content: "确定提交吗?", 
        delete: "确定删除该条记录吗?",
    },

    //login
    login: {
        title: "账号登录",
        rules:{
            username: "请输入用户名",
            password: "请输入密码",
        },
        placeholder:{
            username: "用户名",
            password: "密码",
        },
        button:{
            login: "登录",
        },
    },
    logout: {
        confirm:{
            title: "提示",
            content: "确定退出系统吗？", 
        }
    },
    relogin: {
        title: "消息提示",
        message: "登录验证失效，是否重新登录？"
    },

    //index
    index: {
        dropdown:{
            pwd: "修改密码",
            logout: "退出",
        },
        changePassword: {
            dialog: {
                title: "密码修改",
            },
        }
    },

    //公用字段
    normal: {
        fields:{
            id: "ID",
            status: "状态",
            sort: "排序",
        }
    }, 
    //公用格式化字段
    format:{
        def: {
            disable: "否",
            enable: "是",
        },
        status: {
            disable: "禁用",
            enable: "启用",
        },
        admin: {
            disable: "否",
            enable: "是",
        },
    },
    //选项
    options: {
        def: {
            disable: "否",
            enable: "是",
        },
    },

    //user
    user: {
        filters: {
            placeholder:{
                username: "用户名",
                nick: "昵称",
            },
            label:{

            }
        },
        rules:{
            username: "请输入用户名",
            nick: "请输入用户昵称",
        },
        fields:{
            username: "用户名",
            nick: "昵称",
            password: "密码",
            password2: "确认密码",
            status: "状态",
            admin: "管理员",
        },
        button: {
            resetPwd: "重置密码",
            auth: "授权",
            selectAll: "全选",
        },
        dialog: {
            title: {
                resetPwd: "重置密码",
                authMenu: "{nick}的菜单按钮授权",
            }
        }
    },
    //job
    jobtype: {
        filters: {
            placeholder:{
                name: "名称",
                group: "分组",
            },
        },
        rules:{
            id: "请输入ID",
            number: "{msg}必须为数字",
            name: "请输入名称",
            sort: "请输入序号",
            group: "请选择分组",
        },
        fields:{
            name: "名称",
            group: "分组",
            icon: "图标",
        },
        options: {
            group: {
                society: "社会招聘",
                school: "校园招聘",
            }
        }
    },
    job: {
        filters: {
            placeholder:{
                type: "分类",
                keywords: "关键字：按名称",
                top: "置顶",
            },
        },
        rules:{
            number: "{msg}必须为数字",
            title: "请输入标题",
            type: "请选择分类",
            sort: "请输入序号",
        },
        fields:{
            title: "标题",
            type: "分类",
            top: "置顶",
            date: "创建日期",
            jobContent: "工作内容",
            jobSkill: "任职要求",
            jobExperience: "工作经验",
            jobDegree: "学历要求",
            jobEmail:"简历投递"
        },
    },
}, zhCN.default);

module.exports = zh;