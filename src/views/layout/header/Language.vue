<template>
  <el-dropdown @command="toggleLanguage">
    <div class="el-dropdown-link">
      <i class="fa fa-language"></i>
      &nbsp;{{ languageName }}
      <i class="el-icon-arrow-down el-icon--right"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item in options"
        :key="item.code"
        :command="item.code">
        {{ item.name }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    options(){
      let opt = [];
      for (let i = 0; i < i18n.availableLocales.length; i++) {
        let e = i18n.availableLocales[i];
        let node = {
           code: e ,
           name: e +" "+i18n.messages[e].name
        };
        opt.push(node);
      }
      return opt;
    },
    languageName(){
      let lang = localStorage.getItem(LOCALE_LANG_KEY);
      return i18n.messages[lang].name;
    },
  },
  methods: {
    toggleLanguage(command){
      i18n.setLang(command);
      window.location.reload();
    },
  },
  mounted() {
  },
};
</script>

<style scoped>

</style>