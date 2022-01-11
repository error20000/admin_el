//菜单测试数据
/**
 * 配置说明
 * [{
        id: 100, //
        name: "", //名称
        icon: "", //字段名
        url: "", //字段名
        children: [],
    }]
*/
let test = [
    {
        id: 100, 
        name: "导航一", 
        icon: "el-icon-location",
        url: "", 
        children: [
            {
                id: 101, 
                name: "选项1", 
                icon: "",
                url: "http://www.baidu.com", 
                children: [],
            },
            {
                id: 102, 
                name: "选项2", 
                icon: "",
                url: "", 
                children: [],
            },
            {
                id: 103, 
                name: "选项3", 
                icon: "",
                url: "", 
                children: [
                    {
                        id: 1031, 
                        name: "选项31", 
                        icon: "",
                        url: "", 
                        children: [],
                    },
                    {
                        id: 1032, 
                        name: "选项32选项32选项32选项32选项32选项32选项32选项32", 
                        icon: "",
                        url: "http://www.baidu.com", 
                        children: [
                            {
                                id: 10321, 
                                name: "选项321", 
                                icon: "",
                                url: "", 
                                children: [],
                            }
                        ],
                    }
                ],
            }
        ],
    },
    {
        id: 200, 
        name: "导航二", 
        icon: "el-icon-menu",
        url: "", 
        children: [],
    },
    {
        id: 300, 
        name: "导航三", 
        icon: "el-icon-document",
        url: "http://www.baidu.com", 
        children: [],
    },
    {
        id: 400, 
        name: "导航四", 
        icon: "el-icon-setting",
        url: "", 
        children: [],
    },
    {
        id: 500, 
        name: "导航5", 
        icon: "el-icon-setting",
        url: "", 
        children: [],
    },
    {
        id: 600, 
        name: "导航6", 
        icon: "el-icon-setting",
        url: "", 
        children: [],
    },
    {
        id: 700, 
        name: "导航7", 
        icon: "el-icon-setting",
        url: "", 
        children: [],
    },
    {
        id: 800, 
        name: "导航8", 
        icon: "el-icon-setting",
        url: "", 
        children: [],
    },
    {
        id: 900, 
        name: "导航9", 
        icon: "el-icon-setting",
        url: "", 
        children: [
            {
                id: 901, 
                name: "选项1", 
                icon: "",
                url: "", 
                children: [],
            },
            {
                id: 902, 
                name: "选项2", 
                icon: "",
                url: "", 
                children: [],
            },
            {
                id: 903, 
                name: "选项3", 
                icon: "",
                url: "", 
                children: [
                    {
                        id: 9031, 
                        name: "选项31", 
                        icon: "",
                        url: "", 
                        children: [],
                    },
                    {
                        id: 9032, 
                        name: "选项32", 
                        icon: "",
                        url: "http://www.baidu.com", 
                        children: [],
                    }
                ],
            },
            {
                id: 904, 
                name: "选项4", 
                icon: "",
                url: "", 
                children: [],
            },
        ],
    }
];

export default test;