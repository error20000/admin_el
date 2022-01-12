<template>
  <div class="ant-dropdown-menu s-tool-column ant-dropdown-content">
    <div class="s-tool-column-header s-tool-column-item">
      <el-checkbox :indeterminate="indeterminate" v-model="checkAll" @change="handleCheckAllChange">
        列展示
      </el-checkbox>
      <a @click="reset">重置</a>
    </div>
    <el-divider></el-divider>
    <div class="ant-checkbox-group">
      <div>
        <!-- <draggable v-model="columnsSetting" animation="300" @end="emitColumnChange"> -->
          <div class="s-tool-column-item" v-for="item in columnsSetting" :key="item.field">
            <div class="s-tool-column-handle" >
              <!-- <a-icon type="more"/>
              <a-icon type="more"/> -->
            </div>
            <el-checkbox v-model="item.checked" @change="handleChange">{{ item.name }}</el-checkbox>
          </div>
        <!-- </draggable> -->
      </div>
    </div>
  </div>
</template>

<script>
//   import draggable from 'vuedraggable'

  export default {
    name: "ColumnSet",
    props: {
      columns: {
        type: Array,
        default: () => {
            return [];
        }
      }
    },
    components: {
    //   draggable
    },
    data() {
      return {
        indeterminate: false,
        checkAll: true,
        columnsSetting: [],
        originColumns: []
      }
    },
    created(){
        this.originColumns = JSON.parse(JSON.stringify(this.columns));
        this.columnsSetting = this.columns.map(value => ({ ...value, checked: true }))
    },
    methods: {
      reset() {
        this.columnsSetting = JSON.parse(JSON.stringify(this.originColumns))
        this.indeterminate = false
        this.checkAll = true
        this.emitChange()
      },
      handleChange() {
        let checkedList = this.columnsSetting.filter(value => value.checked)
        this.indeterminate = !!checkedList.length && checkedList.length < this.columnsSetting.length
        this.checkAll = checkedList.length === this.columnsSetting.length
        this.emitChange()
      },
      handleCheckAllChange(val) {
        this.columnsSetting = this.columns.map(value => ({ ...value, checked: val }))
        this.isIndeterminate = false;
        this.emitChange()
      },
      emitChange() {
        this.$emit('columnChange', this.columnsSetting)
      }
    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>

</style>
