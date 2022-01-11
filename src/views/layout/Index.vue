<template>
  <el-container class="layout">

    <!-- aside -->
    <side-menu v-if="isSideMenu" :collapse="collapse" :menuData="menuData" @menuSelect="menuSelect"></side-menu>
    
    <el-container>
      <!-- header -->
      <header-menu :collapse="collapse" @collapse="handleCollapse" :menuData="menuData" @menuSelect="menuSelect"></header-menu>
      <!-- main -->
      <el-main class="main">
        <transition name="main" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
      
      <!-- footer -->
      <el-footer class="footer">footer</el-footer>

    </el-container>

  </el-container>
</template>
<script>

import SideMenu from "@/components/menu/SideMenu.vue";
import HeaderMenu from "./header/Index.vue";
import {mapState} from 'vuex'
import TestMenu from "@/components/menu/test.js";

export default {
  components: {
    SideMenu,
    HeaderMenu,
  },
  data () {
    return {
       layout: 'side',
       collapse: true,
       subMenu: [],
    }
  },
  computed:{
    menuData(){
      return TestMenu;
      let dataStr = localStorage.getItem(window.e.userAuth);
      if(!dataStr){
        return;
      }
      let menus = JSON.parse(dataStr).menus;
      console.log("menuData");
      return this.findChildren("", menus);
    }
  },
  methods:{
    findChildren(parentId, menus){
      let temp = [];
      for (let i = 0; i < menus.length; i++) {
        if(!parentId && !menus[i].parentId){ //根菜单
          let node = menus[i];
          node.children = this.findChildren(menus[i].id, menus);
          temp.push(node);
          //有子菜单的菜单
          if(node.children.length > 0){
            this.subMenu.push(node.id + '');
          }
        }else if(parentId == menus[i].parentId){
          let node = menus[i];
          node.children = this.findChildren(menus[i].id, menus);
          temp.push(node);
          //有子菜单的菜单
          if(node.children.length > 0){
            this.subMenu.push(node.id + '');
          }
        }
      }
      return temp;
    },
    isSideMenu(){
      return this.layout === 'side';
    },
    handleCollapse(){
      this.collapse = !this.collapse;
    },
    menuSelect(index, path){
      console.log("menuSelect",index, path);
    }
  },
  mounted(){
      console.log(this);
  }
};
</script>

<style>

.layout{
  height: 100%;
}
.footer{
  height: 0 !important;
}

</style>