<template>
	<div>
		<el-row class="filter">
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-tabs value="filter" >
					<!-- filter -->
					<el-tab-pane :label="$t('label.filter')" name="filter" disabled v-hasAuth="authBtn.query">
						<div class="filter-panel">
							<filter-form :filters="filters" @query="handleQuery" @reset="handleReset" class="filter-form" />
							<div class="btn-add" v-hasAuth="authBtn.add">
								<el-button @click="handleAdd" :title="$t('label.title.add')" icon="fa fa-plus" type="primary"></el-button>
							</div>
						</div>
					</el-tab-pane>
				</el-tabs>
			</el-col>
		</el-row>

		<el-tabs class="result" v-model="activeTab" >
			<el-tab-pane :label="$t('label.result')" name="table" disabled v-hasAuth="authBtn.query">
				<!-- list -->
				<el-table :data="list" highlight-current-row border v-loading="listLoading" style="width: 100%;" class="mytable" >
					<template v-for="(item, name) in fields">
						<el-table-column  
							v-if="!(item.table.show == false || item.show == false && !(item.show == false && item.table.show == true))" 
							:key="name"
							:label="item.name" :prop="item.field" 
							:width="item.table.width"
							:fixed="item.table.fixed"
							:formatter="item.table.formatter"
							:min-width="tableMaxWidth[name]" 
							:class-name="'tableFlexWidth-'+name">
							<!-- slot -->
							<template v-if="item.field == 'icon'" v-slot:default="scope">
								<span >
									<img :src="scope.row.icon" alt="" >
								</span>
							</template>
						</el-table-column>
					</template>
					
					<el-table-column fixed="right" :label="$t('label.action')" width="100" align="center">
						<template slot-scope="scope">
							<el-dropdown trigger="click">
							  <el-button type="primary" >
								   <i class="fa fa-cog"></i>
							  </el-button>
							  <el-dropdown-menu slot="dropdown">
								<el-dropdown-item @click.native="handleEdit(scope.$index, scope.row)" v-hasAuth="authBtn.update">
									<i class="fa fa-edit"></i>&nbsp;{{$t('label.title.edit')}}
								</el-dropdown-item>
								<el-dropdown-item @click.native="handleDel(scope.$index, scope.row)" divided class="table-row-del" v-hasAuth="authBtn.delete">
									<i class="fa fa-trash"></i>&nbsp;{{$t('label.title.del')}}
								</el-dropdown-item>
							  </el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
		
				<!-- page tool -->
				<el-col :span="24" class="toolbar" style="margin-top: 10px;">
					<!-- <el-button type="danger" @click="handleBatchDel" :disabled="this.sels.length===0" v-hasAuth="authKey.batchDel">{{$t('label.title.batchDel')}}</el-button> -->
					<el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100]" :page-size="rows" :total="total" style="float:right;">
					</el-pagination>
				</el-col>
			</el-tab-pane>
		</el-tabs>

		<add-form ref="addForm" @ok="handleOk" v-hasAuth="authBtn.add"/>
		<edit-form ref="editForm" @ok="handleOk" v-hasAuth="authBtn.update"/>
	</div>
</template>

<script>


import { JOB_TYPE_LIST, JOB_TYPE_DEL } from "@/api";
import fields from "./config/fields.js";
import filters from "./config/filters.js";
import authBtn from "./config/authBtn.js";
import FilterForm from "@/components/filter/Filter.vue";
import AddForm from "./AddForm.vue";
import EditForm from "./EditForm.vue";

export default {
    components: {
		FilterForm,
		AddForm,
		EditForm,
    },
	data: function() {
		return {
			list: [],
			total: 0,
			page: 1,
			rows: 10,
			listLoading: false,
			activeTab: "table",
			tableMaxWidth: {},
			fields: fields,

			filters: filters,
			filterForm:{}, //记录筛选条件

			authBtn: authBtn,
		}
	},
  
	methods: {
		//table
		handleSizeChange: function (val) {
			this.rows = val;
			this.getList();
		},
		handleCurrentChange: function (val) {
			this.page = val;
			this.getList();
		},
		handleQuery: function(filterForm){
			this.filterForm = filterForm;
			this.page = 1;
			this.getList();
		},
		handleReset: function(filterForm){
			this.filterForm = filterForm;
			this.page = 1;
			this.getList();
		},
		handleOk: function(){
			this.page = 1;
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
			JOB_TYPE_LIST(params).then(res => {
				this.listLoading = false;
				this.list = res.data;
				this.total = res.total;
			}).catch(error => {
				this.listLoading = false;
			});
		},
		//操作
		handleAdd: function(){
			this.$refs["addForm"].handleAdd();
		},
		handleEdit: function(index, row){
			this.$refs["editForm"].handleEdit(index, row);
		},
		handleDel: function(index, row){
			this.$confirm(i18n.t("confirm.delete"), i18n.t("confirm.title"), {
				type: 'warning'
			}).then(() => {
				let params = {id: row.id};
				this.listLoading = true;
				JOB_TYPE_DEL(params).then(res => {
					this.listLoading = false;
					this.getList();
				}).catch(error => {
					this.listLoading = false;
				});
			}).catch(() => {});
		},
  	},
  	mounted: function() {
		this.getList();
	}
}
</script>

<style scoped>
	.filter-panel{
		min-height: 47px;
	}
	.filter-form {
		float: right;
		margin-right: 60px;
	}
	.btn-add{
		position: absolute;
		right: 10px;
		bottom: 18px;
	}
	.table-row-del{
		color: #f56c6c;
	}
</style>