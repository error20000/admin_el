<template>
  <div class="index">
    <el-container>
      <el-header class="header">
        <span class="logo">
          <router-link :to="{ path: '/' }">
            <!-- <span class="logo-img"><img :src="this.logo" /></span> -->
            {{ $t('sysName') }} 
          </router-link>
        </span>
        <span class="personal">
          <!-- <el-dropdown class="lang" @command="handleLanguage">
            <span class="el-dropdown-link">
              <i class="fa fa-language fa-lg"></i>
              &nbsp;{{ languageName }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in languageOpt"
                :key="item.code"
                :command="item.code"
                >{{ item.name }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown> -->
          <el-dropdown trigger="click">
            <span class="el-dropdown-link userinfo-inner">
              {{ sysUserName }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handlePwdChange">
                <i class="fa fa-key fa-fw"></i>&nbsp;{{
                  $t("index.dropdown.pwd")
                }}
              </el-dropdown-item>
              <el-dropdown-item @click.native="logout">
                <i class="fa fa-power-off fa-fw"></i>&nbsp;{{
                  $t("index.dropdown.logout")
                }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </el-header>
      <!-- <el-container class="main">
        <router-view></router-view>
      </el-container> -->
      <el-container class="main-container">
        <el-aside width="200px" class="aside">
          <el-menu
            @select="handleSelect"
            background-color="#545c64"
            text-color="#ffffff"
            active-text-color="#ffd04b"
            :default-openeds="defOpened"
            :default-active="$route.path">
            <!-- <el-submenu index="/job">
              <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>职位管理</span>
              </template>
              <el-menu-item index="/jobtype">职位分类</el-menu-item>
              <el-menu-item index="/job">职位</el-menu-item>
            </el-submenu>
            <el-menu-item index="/user">
              <i class="el-icon-user-solid"></i>
              <span slot="title">用户管理</span>
            </el-menu-item> -->
            
              <template v-for="(item,index) in menuTree">
                <el-menu-item v-if="!item.children.length" :index="item.url" :key="index">{{item.name}}</el-menu-item>
                <el-submenu v-if="item.children.length" :index="item.id+''" :key="index">
                  <template slot="title">{{item.name}}</template>
                  <template v-for="(item2, index2) in item.children">
                    <el-menu-item v-if="!item2.children.length" :index="item2.url" :key="index2">{{item2.name}}</el-menu-item>
                    <el-submenu v-if="item2.children.length" :index="item2.id+''" :key="index2">
                      <template slot="title">{{item2.name}}</template>
                      <template v-for="(item3, index3) in item2.children">
                        <el-menu-item :index="item3.url" :key="index3">{{item3.name}}</el-menu-item>
                      </template>
                    </el-submenu>
                  </template>
				    	  </el-submenu>
              </template>

          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>


    <!--Change Password-->
    <el-dialog
      :title="$t('index.changePassword.dialog.title')"
      :visible.sync="pwdFormVisible"
      :close-on-click-modal="false">
      <el-form :model="pwdForm" :rules="pwdFormRules" ref="pwdForm" label-width="120px">
        <el-form-item :label="$t('pwd.form.oldPwd')" prop="oldPwd">
          <el-input type="text" v-model="pwdForm.oldPwd"></el-input>
        </el-form-item>
        <el-form-item :label="$t('pwd.form.newPwd')" prop="newPwd">
          <el-input type="password" show-password v-model="pwdForm.newPwd"></el-input>
        </el-form-item>
        <el-form-item :label="$t('pwd.form.newPwd2')" prop="newPwd2">
          <el-input type="password" show-password v-model="pwdForm.newPwd2"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pwdChangeClose">{{ $t('dialog.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="pwdChange"
          :loading="pwdLoading"
        >{{ $t('dialog.submit') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import { ADD_HEADER, USER_LOGOUT, USER_ISLOGIN, USER_CHANGE_PWD, USER_AUTH } from "@/api";

export default {
  name: "Index",
  data() {
    return {
      collapsed: false,
      isCollapse: false,
      sysUserName: "",
      languageName: "中文",
      languageOpt: [],
      logo: require("../assets/logo.png"),
      //menu
      menus: [],
      menuTree: [],
      defOpened: [],
      //pwd
      pwdFormVisible: false,
      pwdLoading: false,
      pwdFormRules: {
        oldPwd: [{ required: true, message: i18n.t('pwd.rules.oldPwd'), trigger: "blur" }],
        newPwd: [
          { required: true, message: i18n.t('pwd.rules.newPwd'), trigger: "blur" },
          { validator: (rule, value, callback) => {
              if (window.e.pwd.reg && !window.e.pwd.reg.test(this.pwdForm.newPwd) ) {
                callback(new Error(i18n.t('pwd.rules.format')+i18n.t('pwd.regTips')));
              } else {
                callback();
              }
          }, trigger: 'blur' }
        ],
        newPwd2: [
          { required: true, message: i18n.t('pwd.rules.newPwd2'), trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value !== this.pwdForm.newPwd) {
                callback(new Error(i18n.t('pwd.rules.same')));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      },
      pwdForm: {
        oldPwd: "",
        newPwd: "",
        newPwd2: ""
      }
    };
  },
  methods: {
    //menu
    handleSelect: function(index, path){
      console.log(this.$route.path, index, path);
      if(this.$route.path !== index){
        this.$router.push(index);
      }
    },
    userMenu(){
      let dataStr = localStorage.getItem(window.e.userAuth);
      if(!dataStr){
        return;
      }
      this.menus = JSON.parse(dataStr).menus;
      this.menuTree = this.findChildren("", this.menus);
      // console.log(this.menuTree);
      // console.log(this.defOpened);
    },
    findChildren(parentId, menus){
      let temp = [];
      for (let i = 0; i < menus.length; i++) {
        if(!parentId && !menus[i].parentId){ //根菜单
          let node = menus[i];
          node.children = this.findChildren(menus[i].id, menus);
          temp.push(node);
          //默认展开
          if(node.children.length > 0){
            this.defOpened.push(node.id+'');
          }
        }else if(parentId == menus[i].parentId){
          let node = menus[i];
          node.children = this.findChildren(menus[i].id, menus);
          temp.push(node);
          //默认展开
          if(node.children.length > 0){
            this.defOpened.push(node.id+'');
          }
        }
      }
      return temp;
    },
    //pwd
    handlePwdChange: function() {
      this.pwdFormVisible = true;
      this.pwdForm = {
        oldPwd: "",
        newPwd: "",
        newPwd2: ""
      };
    },
    pwdChangeClose: function() {
      this.pwdFormVisible = false;
      this.pwdLoading = false;
      this.$refs.pwdForm.resetFields();
    },
    pwdChange: function() {
      this.$refs.pwdForm.validate(valid => {
        if (valid) {
          this.$confirm(
            i18n.t("confirm.content"),
            i18n.t("confirm.title"),
            {}
          ).then(() => {
            var params = Object.assign({}, this.pwdForm);
            delete params.newPwd2;
            this.pwdLoading = true;
            USER_CHANGE_PWD(params).then(res => {
              this.pwdLoading = false;
              this.pwdFormVisible = false;
              //跳转登录
              this.$router.push(window.e.page.login);
            }).catch(error => {
              this.pwdLoading = false;
            });
          });
        }
      });
    },
    //login
    logout: function() {
      this.$confirm(
        i18n.t("logout.confirm.content"),
        i18n.t("logout.confirm.title"),
        {
          type: 'warning'
        }
      )
        .then(() => {
          USER_LOGOUT().then(() => {
              localStorage.removeItem(window.e.tokenName);
              localStorage.removeItem(window.e.tokenUser);
              //跳转登录
              this.$router.push(window.e.page.login);
          });
        })
        .catch(function() {});
    },
    //check
    isLogin: function(cb) {
      //获取本地存储
      let token = localStorage.getItem(window.e.tokenName);
      if(!token){
        //跳转登录
        this.$router.push(window.e.page.login);
        return;
      }
      //验证登录
      USER_ISLOGIN().then(res => {
        //更新用户信息
        localStorage.setItem(window.e.tokenUser, JSON.stringify(res.data));
        //更新用户权限
        USER_AUTH().then(res => {
          localStorage.setItem(window.e.userAuth, JSON.stringify(res.data));
        });
      });
    },
    getUserNick(){
      let userStr = localStorage.getItem(window.e.tokenUser);
      if(!userStr){
        return;
      }
      let user = JSON.parse(userStr);
      this.sysUserName = user.nick || user.username;
    }
  },
  mounted() {
    if(window.e.page.home == this.$route.path 
        || window.e.page.index == this.$route.path){
      this.isLogin();
    }
    this.getUserNick(); //昵称
    this.userMenu(); //菜单
  }
};
</script>

<style lang="scss" scoped>

@import '../assets/scss/mixin.scss';

.index {
  height: 100%;
}
.header {
  @include head_bg_color();
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.12),
    0 10px 12px 0 rgba(170, 182, 206, 0.2),
    inset 0 -1px 0 0 rgba(255, 255, 255, 0.3);
}
.logo2 {
  float: left;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.personal {
  float: right;
  position: relative;
  top: 50%;
  transform: translateY(-50%);

  .lang {
    margin-right: 10px;
  }
}

.main-container{
  height: calc(100% - 60px) !important;
}

.aside {
  padding-top: 4px;
  background-color: #545c64
}

// .main{
  
// }

/** element */

.el-container {
  height: 100%;
}
.el-menu {
  border-right: none !important;
}
.el-menu-item i, .el-submenu__title i {
    color: inherit !important;
}
// .el-menu-item{
//     @include head_bg_color();
//     @include nav_text_color();

//     &.is-active {
//         @include nav_active_bg_color();
//         @include nav_active_text_color();
//     }
// }

</style>
