<template>
  <el-aside :width="collapse ? '64px': '200px'" class="side shadow">
    <div :class="['logo', theme]">
      <router-link to="/">
        <img src="@/assets/logo.png" :title="systemName" />
        <h1 v-if="!collapse" :title="systemName">{{ systemName }}</h1>
      </router-link>
    </div>
    <div class="menu-container test-1">
      <el-menu
        class="menu"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="collapse"
        @select="handleSelect"
      >
        <el-submenu index="/job">
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
        </el-menu-item>
        <el-menu-item index="1"> <span slot="title">处理中心</span></el-menu-item>
      </el-menu>
    </div>
  </el-aside>
</template>
<script>
export default {
  props: {
    collapse: {
      type: Boolean,
      required: false,
      default: false
    },
    menuData: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    }
  },
  data() {
    return {
      systemName: "后台管理系统",
    };
  },
  methods: {
    handleSelect(index, path){
      console.log(index, path);
    }
  },
  mounted() {

  },
};
</script>

<style lang="scss" scoped>
.shadow {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}
.side {
  min-height: 100vh;
  background-color: #545c64;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  .logo {
    height: 60px;
    line-height: 60px;
    position: relative;
    padding-left: 16px;
    overflow: hidden;
    background-color: #545c64;
    &.light {
      background-color: #fff;
      h1 {
        color: #141414;
      }
    }
    a {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
    }
    h1 {
      color: #fff;
      margin: 0 0 0 12px;
      display: inline-block;
      vertical-align: middle;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 70%;
    }
    img {
      width: 32px;
      vertical-align: middle;
    }
  }
}
.menu-container {
  /* padding: 16px 0; */
  overflow-y: auto;
  height: 100vh;
}

.test-1::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.test-1::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
.test-1::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
</style>