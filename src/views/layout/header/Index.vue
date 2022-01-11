<template>
  <el-header class="header shadow">
    <!-- <span :class="['logo', theme]">
      <router-link to="/">
        <img src="@/assets/logo.png" />
        <h1 :title="systemName">{{ systemName }}</h1>
      </router-link>
    </span> -->
    <span class="trigger">
      <i :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="toggleCollapse"></i>
    </span>
    <!-- <el-menu mode="horizontal" >
      <menu-tree :menuData="menuData"/>
    </el-menu> -->
    <span class="header-menu">
      <menu-tree :menuData="menuData" :mode="mode" @select="onSelect" />
    </span>
    <span class="header-right">
      <avatar class="header-item"/>
      <language class="header-item"/>
    </span>
  </el-header>
</template>

<script>
import Avatar from "./Avatar.vue";
import Language from "./Language.vue";
import MenuTree from "@/components/menu/MenuTree.js";

export default {
  components: {
    Avatar,
    Language,
    MenuTree,
  },
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
      theme: "dark",
      systemName: "后台管理系统",
      mode: 'horizontal',
    };
  },
  methods: {
    toggleCollapse () {
      this.$emit('collapse')
    },
    onSelect(index, path){
      this.$emit('menuSelect', index, path);
    },
  },
  mounted() {
    
  },
};
</script>

<style lang="scss" scoped>
.shadow {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}
.header {
  line-height: 60px;
  display: flex;
  .logo {
    height: 60px;
    line-height: 60px;
    position: relative;
    padding-left: 24px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
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

.trigger{
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: #1890ff;
  }
}

.header-menu{
  flex: 1 0;
}

.header-right{
  display: flex;
  color: inherit;

  .header-item {
    color: inherit;
    padding: 0 12px;
    cursor: pointer;
    align-self: center;
    &:hover {
      background-color: rgba(0,0,0,.025);
    }
  }
}

</style>