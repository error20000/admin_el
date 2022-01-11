
let e = {
    tokenName: "login_token",
    tokenUser: "login_user",
    userAuth: "login_user_auth",
    page:{
        base: process.env.BASE_URL.substring(0, process.env.BASE_URL.length - 1),
        home: "/",
        index: "/index",
        login: "/login",
    },
    pwd:{
        reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
    }
};

window.e = e;

export default e;
