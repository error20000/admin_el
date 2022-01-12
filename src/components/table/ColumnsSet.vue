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
        this.originColumns = this.deepClone(this.columns);
        this.columnsSetting = this.columns.map(value => ({ ...value, checked: true }));
    },
    methods: {
      // 定义一个深拷贝函数  接收目标target参数
      deepClone: function(target) {
        // 定义一个变量
        let result;
        // 如果当前需要深拷贝的是一个对象的话
        if (typeof target === 'object') {
        // 如果是一个数组的话
            if (Array.isArray(target)) {
                result = []; // 将result赋值为一个数组，并且执行遍历
                for (let i in target) {
                    // 递归克隆数组中的每一项
                    result.push(this.deepClone(target[i]))
                }
            // 判断如果当前的值是null的话；直接赋值为null
            } else if(target===null) {
                result = null;
            // 判断如果当前的值是一个RegExp对象的话，直接赋值    
            } else if(target.constructor===RegExp){
                result = target;
            }else {
            // 否则是普通对象，直接for in循环，递归赋值对象的所有值
                result = {};
                for (let i in target) {
                    result[i] = this.deepClone(target[i]);
                }
            }
        // 如果不是对象的话，就是基本数据类型，那么直接赋值
        } else {
            result = target;
        }
        // 返回最终结果
        return result;
      },
      reset() {
        this.columnsSetting = this.deepClone(this.originColumns);
        this.indeterminate = false;
        this.checkAll = true;
        this.emitChange();
      },
      handleChange() {
        let checkedList = this.columnsSetting.filter(value => value.checked);
        this.indeterminate = !!checkedList.length && checkedList.length < this.columnsSetting.length;
        this.checkAll = checkedList.length === this.columnsSetting.length;
        this.emitChange();
      },
      handleCheckAllChange(val) {
        this.columnsSetting = this.columns.map(value => ({ ...value, checked: val }));
        this.indeterminate = false;
        this.emitChange();
      },
      emitChange() {
        this.$emit('columnChange', this.columnsSetting);
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
