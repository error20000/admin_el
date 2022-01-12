<template>
	<div>
		<!-- head tool -->
		<el-col :span="24" class="toolbar" style="margin-bottom: 10px;">
			<!-- 顶部工具栏slot -->
			<slot name="headToolbar">
				<div style="float:right;">
					<i class="head-item-icon el-icon-refresh" title="刷新" @click="handleRefresh"></i>
					<el-popover trigger="click">
						<columns-set :columns="columns" @columnChange="handleColumnChange"></columns-set>
						<i slot="reference" class="head-item-icon el-icon-setting" title="列设置"></i>
					</el-popover>
				</div>
			</slot>
		</el-col>

		<!-- Table -->
		<el-table :data="list" highlight-current-row border v-loading="listLoading" style="width: 100%;" class="mytable" >
			<!-- <el-table-column type="selection" width="50"></el-table-column> -->
			<template v-for="(item, name) in columns">
				<!-- 为保留默认cell，这里只有全局slot -->
				<slot :name="`item_`+item.field">
					<el-table-column  
						v-if="item.checked" 
						:key="name"
						:label="item.name" :prop="item.field" 
						:width="item.table.width"
						:fixed="item.table.fixed"
						:formatter="item.table.formatter"
						:min-width="tableMaxWidth[name]" 
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

			<!-- action -->
			<el-table-column fixed="right" :label="$t('label.action')" width="100" align="center">
				<template slot-scope="scope">
					<slot name="action" :row="scope.row" :column="scope.column" :$index="scope.$index"></slot>
				</template>
			</el-table-column>
		</el-table>

		<!-- page tool -->
		<el-col :span="24" class="toolbar" style="margin-top: 10px;">
			<!-- 底部工具栏slot -->
			<slot name="pageToolbar">
				<!-- <el-button type="danger" @click="handleBatchDel" :disabled="this.sels.length===0" v-hasAuth="authKey.batchDel">{{$t('label.title.batchDel')}}</el-button> -->
				<el-pagination layout="total, sizes, prev, pager, next, jumper" 
					@size-change="handleSizeChange" 
					@current-change="handleCurrentChange" 
					:page-sizes="[1, 10, 20, 50, 100]" 
					:current-page="page" 
					:page-size="rows" 
					:total="total" style="float:right;">
				</el-pagination>
			</slot>
		</el-col>
	</div>
</template>

<script>

import { USER_LIST } from "@/api";
import fields from "./config/fields.js";
import ColumnsSet from "@/components/table/ColumnsSet.vue";

export default {
    components: {
		ColumnsSet
    },
	props:{
		filterForm: {
			type: Object,
			default: function () {
				return {};
			}
		},
	},
	data: function() {
		return {
			list: [],
			total: 0,
			page: 1,
			rows: 10,
			listLoading: false,

			tableMaxWidth: {},
			fields: fields,
			columns: []
		}
	},
	created(){
		for (let key in this.fields) {
			let item = this.fields[key];
			if(!!(item.table.show == false || item.show == false && !(item.show == false && item.table.show == true))){
				continue;
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
		//query
		handleQuery(){
			this.page = 1;
			this.getList();
		},
		handleRefresh () {
			this.getList();
		},
		//table
		handleSizeChange: function (val) {
			this.rows = val;
			this.getList();
		},
		handleCurrentChange: function (val) {
			this.page = val;
			this.getList();
		},
		getList: function(){
			let params = {
				page: this.page,
				rows: this.rows,
			}
			for ( var key in this.filterForm) {
				if(this.filterForm[key]){
					params[key] = this.filterForm[key];
				}
			}
			this.listLoading = true;
			USER_LIST(params).then(res => {
				this.listLoading = false;
				this.list = res.data;
				this.total = res.total;
			}).catch(error => {
				this.listLoading = false;
			});
		},
		//
		handleColumnChange(columns){
			this.columns = columns;
		}
  	},
  	mounted: function() {
		this.handleQuery();
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