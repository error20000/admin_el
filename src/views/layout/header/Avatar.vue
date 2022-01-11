<template>
  <el-dropdown >
    <div class="el-dropdown-link">
      {{ sysUserName }}
      <i class="el-icon-arrow-down el-icon--right"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="handlePwdChange">
        <i class="fa fa-key fa-fw"></i>&nbsp;修改密码
      </el-dropdown-item>
      <el-dropdown-item @click.native="handleLogout">
        <i class="fa fa-power-off fa-fw"></i>&nbsp;退出登录
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  data() {
    return {
      sysUserName: "Admin",
    };
  },
  methods: {
    handlePwdChange(){

    },
    handleLogout(){

    }
  },
  mounted() {

  },
};
</script>

<style scoped>

</style>