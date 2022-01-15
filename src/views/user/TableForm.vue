<template>
	<x-table :fields="fields" 
		:list="list" 
		:total="total" 
		:page="page" 
		:rows="rows" 
		:loading="listLoading"
		@query="handleList"
		@sort="handleSort">

		<!-- 顶部工具栏 -->
		<template v-slot:header>
			<slot name="header"></slot>
		</template>
		<template v-slot:header_left>
			<slot name="header_left"></slot>
		</template>
		<template v-slot:header_right>
			<slot name="header_right"></slot>
		</template>

		<!-- 首列 -->
		<template v-slot:column_first>
			<slot name="column_first">
				<el-table-column type="selection" width="50"></el-table-column>
				<!-- <el-table-column type="index" width="50"></el-table-column> -->
			</slot>
		</template>
		
		<!-- 字段列 -->
		<template v-for="item in fields" v-slot:[`column_`+item.field]>
			<slot :name="`column_`+item.field"></slot>
		</template>

		<!-- 尾列 -->
		<template v-slot:column_tail>
			<slot name="column_tail">
				<!-- 操作列 -->
				<el-table-column fixed="right" :label="$t('page.label.action')" width="100" align="center">
					<template slot-scope="scope">
						<slot name="action" :row="scope.row" :column="scope.column" :$index="scope.$index"></slot>
					</template>
				</el-table-column>
			</slot>
		</template>
		
		<!-- 顶部工具栏插槽 -->
		<template v-slot:footer>
			<slot name="footer"></slot>
		</template>
		<template v-slot:footer_left>
			<slot name="footer_left"></slot>
		</template>
		<template v-slot:footer_right>
			<slot name="footer_right"></slot>
		</template>

	</x-table>
</template>

<script>

import { USER_LIST } from "@/api";
import fields from "./config/fields.js";
import XTable from "@/components/table/XTable.vue";

export default {
    components: {
		XTable
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
			sortBy: "",
			sortOrder: "",
			fields: fields,
		}
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
		handleList(page, rows){
			this.page = page;
			this.rows = rows;
			this.getList();
		},
		handleSort: function (sortBy, sortOrder) {
			this.sortBy = sortBy;
			this.sortOrder = sortOrder;
			this.getList();
		},
		getList: function(){
			let params = {
				page: this.page,
				rows: this.rows,
				sortBy: this.sortBy,
				sortOrder: this.sortOrder,
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
  	},
  	mounted() {
		
	}
}
</script>

<style scoped>
</style>