<template>
  <div class="ant-dropdown-menu s-tool-column ant-dropdown-content">
    <div class="column-header column-item">
      <el-checkbox class="checkbox" :indeterminate="indeterminate" v-model="checkAll" @change="handleCheckAllChange">
        列展示
      </el-checkbox>
      <a class="reset" @click="reset">重置</a>
    </div>
    <el-divider class="divider"></el-divider>
    <div class="ant-checkbox-group">
      <div>
        <draggable v-model="columnsSetting" animation="300" @end="emitChange">
          <div class="column-item" v-for="item in columnsSetting" :key="item.field">
            <div class="column-handle" >
              <i class="el-icon-more"></i>
              <i class="el-icon-more"></i>
            </div>
            <el-checkbox class="checkbox" v-model="item.checked" @change="handleChange">{{ item.name }}</el-checkbox>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'

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
      draggable
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
        this.indeterminate = false;
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

<style lang="scss" scoped>
.column-header{
  padding: 5px 16px 10px 24px;
  min-width: 180px;
  .reset{
    cursor: pointer;
  }
}
.divider{
  margin: 0;
}
.column-item{
  display: flex;
  align-items: center;
  padding: 4px 16px 4px 4px;
  .checkbox{
    flex: 1;
  }
  .column-handle{
    opacity: .8;
    cursor: move;
    i{
      transform: rotate( 90deg);
      & + i{
        margin: 4px 4px 0 -10px;
      }
    }
  }
}
</style>
