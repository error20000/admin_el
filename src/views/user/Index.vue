<template>
	<div>
		<el-row class="filter">
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-tabs value="filter" >
					<!-- filter -->
					<el-tab-pane :label="$t('label.filter')" name="filter" disabled  v-hasAuth="authBtn.query">
						<div class="filter-panel">
							<filter-form ref="filterForm" :filters="filters" @query="handleQuery" @reset="handleReset" class="filter-form" />
							<div class="btn-add"  v-hasAuth="authBtn.add">
								<el-button @click="handleAdd" :title="$t('label.title.add')" icon="fa fa-plus" type="primary"></el-button>
							</div>
						</div>
					</el-tab-pane>
				</el-tabs>
			</el-col>
		</el-row>

		<el-tabs class="result" v-model="activeTab" >
			<el-tab-pane :label="$t('label.result')" name="table" disabled  v-hasAuth="authBtn.query">
				<!-- table -->
				<table-form ref="tableForm" :filterForm="filterForm">
					<!-- test
					<template v-slot:item_id>
						<el-table-column  
							label="item.name" prop="id" >
							<template v-slot:default="scope">
								1233{{ console.log(scope)}}
							</template>
						</el-table-column>
					</template> -->
					<!-- action -->
					<template v-slot:action="scope">
						<el-dropdown trigger="click">
							<el-button type="primary" >
								<i class="fa fa-cog"></i>
							</el-button>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item @click.native="handleEdit(scope.$index, scope.row)" v-hasAuth="authBtn.update">
									<i class="fa fa-edit"></i>&nbsp;{{$t('label.title.edit')}}
								</el-dropdown-item>
								<el-dropdown-item @click.native="handleResetPwd(scope.$index, scope.row)" divided v-hasAuth="authBtn.resetPwd">
									<i class="fa fa-key"></i>&nbsp;{{$t('user.button.resetPwd')}}
								</el-dropdown-item>
								<el-dropdown-item @click.native="handleAuth(scope.$index, scope.row)" :disabled="!!scope.row.admin" v-hasAuth="authBtn.authMenu">
									<i class="fa fa-lock"></i>&nbsp;&nbsp;{{$t('user.button.auth')}}
								</el-dropdown-item>
								<el-dropdown-item @click.native="handleDel(scope.$index, scope.row)" divided class="table-row-del" v-hasAuth="authBtn.delete">
									<i class="fa fa-trash"></i>&nbsp;{{$t('label.title.del')}}
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</template>
				</table-form>
			</el-tab-pane>
		</el-tabs>

		<add-form ref="addForm" @ok="handleOk"  v-hasAuth="authBtn.add"/>
		<edit-form ref="editForm" @ok="handleOk" v-hasAuth="authBtn.update"/>
		<reset-pwd-form ref="resetForm" v-hasAuth="authBtn.resetPwd"/>
		<auth-menu-form ref="authMenuForm" v-hasAuth="authBtn.authMenu"/>
	</div>
</template>

<script>


import { USER_DEL } from "@/api";
import fields from "./config/fields.js";
import filters from "./config/filters.js";
import authBtn from "./config/authBtn.js";
import FilterForm from "@/components/filter/Filter.vue";
import AddForm from "./AddForm.vue";
import EditForm from "./EditForm.vue";
import ResetPwdForm from "./ResetPwdForm.vue";
import AuthMenuForm from "./AuthMenuForm.vue";
import TableForm from "./TableForm.vue";

export default {
    components: {
		FilterForm,
		AddForm,
		EditForm,
		ResetPwdForm,
		AuthMenuForm,
		TableForm,
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
			console: console
		}
	},
	methods: {
		//filter
		handleQuery: function(filterForm){
			this.filterForm = filterForm;
			this.$refs["tableForm"].handleQuery();
		},
		handleReset: function(filterForm){
			this.filterForm = filterForm;
			this.$nextTick(()=>{
				this.$refs["tableForm"].handleQuery();
			});
		},
		//刷新
		handleOk: function(){
			this.$refs["tableForm"].handleQuery();
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
				USER_DEL(params).then(res => {
					this.listLoading = false;
					this.getList();
				}).catch(error => {
					this.listLoading = false;
				});
			}).catch(() => {});
		},
		handleResetPwd: function(index, row){
			this.$refs["resetForm"].handleReset(index, row);
		},
		handleAuth: function(index, row){
			this.$refs["authMenuForm"].handleAuthMenu(index, row);
		},
  	},
  	mounted: function() {
		
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