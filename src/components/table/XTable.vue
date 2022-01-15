<template>
	<div>
		<!-- 顶部工具栏插槽 -->
		<slot name="header">
			<el-col :span="24" class="toolbar" style="margin-bottom: 10px;">
				<div style="float:left;">
					<slot name="header_left">
					<!-- <el-button type="danger" >{{$t('label.title.batchDel')}}</el-button> -->
					</slot>
				</div>
				<div style="float:right;">
					<slot name="header_right">
						<i class="head-item-icon el-icon-refresh" :title="$t('page.title.refresh')" @click="handleRefresh"></i>
						<el-popover trigger="click">
							<columns-set :columns="columns" @columnChange="handleColumnChange"></columns-set>
							<i slot="reference" class="head-item-icon el-icon-setting" :title="$t('page.title.columnSet')"></i>
						</el-popover>
					</slot>
				</div>
			</el-col>
		</slot>

		<!-- 表格 -->
		<el-table :data="list" 
			highlight-current-row border 
			v-loading="loading" style="width: 100%;" class="mytable" 
			@selection-change="handleSelectionChange"
			@sort-change="handleSortChange">
			<!-- 首列（可多列） -->
			<slot name="column_first">
			<!-- <el-table-column type="selection" width="50"></el-table-column> -->
			</slot>

			<!-- 字段列 -->
			<template v-for="(item, name) in columns">
				<!-- 为保留默认cell，这里只有全局slot -->
				<slot :name="`column_`+item.field">
					<el-table-column  
						v-if="item.checked" 
						:key="name"
						:label="item.name" :prop="item.field" 
						:width="item.table.width"
						:fixed="item.table.fixed"
						:formatter="item.table.formatter"
						:min-width="tableMaxWidth[name]" 
						:sortable="item.table.sortable ? 'custom' : false"
						:class-name="'tableFlexWidth-'+name">

						<!-- slot format pic -->
						<template v-if="item.form.type == 5" v-slot:default="scope">
							<span style="display: block;line-height: 0;height:40px;">
								<img :src="scope.row[item.field]" :alt="scope.row[item.field]" :title="scope.row[item.field]" style="max-width: 100%;max-height: 100%;" />
							</span>
						</template>

					</el-table-column>
				</slot>
			</template>

			<!-- 尾列（可多列） -->
			<slot name="column_tail"></slot>
		</el-table>

		<!-- 底部工具栏 -->
		<el-col :span="24" class="toolbar" style="margin-top: 10px;">
			<slot name="footer">
				<div style="float:left;">
					<slot name="footer_left">
				<!-- <el-button type="danger" @click="handleBatchDel" :disabled="this.sels.length===0" v-hasAuth="authKey.batchDel">{{$t('label.title.batchDel')}}</el-button> -->
					</slot>
				</div>
				<div style="float:right;">
					<slot name="footer_right">
						<el-pagination layout="total, sizes, prev, pager, next, jumper" 
							@size-change="handleSizeChange" 
							@current-change="handleCurrentChange" 
							:page-sizes="[1, 2, 10, 20, 50, 100]" 
							:current-page="xpage" 
							:page-size="xrows" 
							:total="total">
						</el-pagination>
					</slot>
				</div>
			</slot>
		</el-col>
	</div>
</template>

<script>

import ColumnsSet from "./ColumnsSet.vue";

export default {
    components: {
		ColumnsSet
    },
	props:{
		fields: {
			type: Object,
			default: function () {
				return {};
			}
		},
		list: {
			type: Array,
			default: function () {
				return [];
			}
		},
		total: {
			type: Number,
			default: 0
		},
		page: {
			type: Number,
			default: 1
		},
		rows: {
			type: Number,
			default: 10
		},
		loading: {
			type: Boolean,
			default: false
		},
	},
	data: function() {
		return {
			xpage: this.page,
			xrows: this.rows,
			tableMaxWidth: {},
			columns: []
		}
	},
	created(){
		for (let key in this.fields) {
			let item = this.fields[key];
			if(!!(item.table.show == false || item.show == false && !(item.show == false && item.table.show == true))){
				continue;//不显示的不加入列表
			}
			this.columns.push({ ...item, checked: true });
		}
	},
	watch:{
		//表格宽度自适应
		// list: function(){
		// 	if(!this.tableMaxWidth){
		// 		return;
		// 	}
		// 	this.$nextTick(function () { 
		// 		for ( var key in this.fields) {
		// 			let tempMaxWidth = 0;
		// 			try {
		// 				for (let i = 0; i <  document.getElementsByClassName("tableFlexWidth-"+key).length; i++){
		// 					let element =  document.getElementsByClassName("tableFlexWidth-"+key)[i];
		// 					let width = element.querySelectorAll('div')[0].offsetWidth;
		// 					tempMaxWidth = tempMaxWidth < width ? width : tempMaxWidth;
		// 				}
		// 			} catch (error) {
		// 				console.error(error);
		// 			}
		// 			this.$set(this.tableMaxWidth, key, tempMaxWidth);
		// 		}
		// 	});
		// }
	}, 
	methods: {
		//table
		handleSelectionChange(val){
			this.$emit("select", val);
		},
		handleSortChange(val){
			if(val.order){
				this.$emit("sort", val.prop, val.order == 'ascending' ? 'asc' : 'desc');
			}else{
				this.$emit("sort", "", "");
			}
		},
		handleSizeChange: function (val) {
			this.xpage = 1;
			this.xrows = val;
			this.emitQuery();
		},
		handleCurrentChange: function (val) {
			this.xpage = val;
			this.emitQuery();
		},
		emitQuery: function(){
			this.$emit("query", this.xpage, this.xrows)
		},
		//Column 
		handleRefresh(){
			this.emitQuery();
		},
		handleColumnChange(columns){
			this.columns = columns;
		},
		//init
		handleInit(){
			this.emitQuery();
		},
  	},
  	mounted: function() {
		this.handleInit();
	}
}
</script>

<style scoped>
.head-item-icon{
	color: rgba(0, 0, 0, 0.3);
	margin-right: 10px;
	font-size: 18px;
	vertical-align: middle;
	cursor: pointer;
}
</style>