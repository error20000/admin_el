<template>
	<!-- reset -->
	<!-- <el-dialog :title="$t('user.dialog.title.resetPwd')" :visible.sync="resetFormVisible" :close-on-click-modal="false">	
		<el-form :model="resetForm" :rules="rules" ref="resetForm" label-width="120px">
			<el-form-item :label="fields.password.name" :prop="fields.password.field" >
				<el-input type="password" show-password v-model="resetForm[fields.password.field]"></el-input>	
			</el-form-item>
			<el-form-item :label="fields.password2.name" :prop="fields.password2.field" >
				<el-input type="password" show-password v-model="resetForm[fields.password2.field]"></el-input>	
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="resetClose">{{$t('dialog.cancel')}}</el-button>
			<el-button type="primary" @click="resetSubmit" :loading="resetLoading">{{$t('dialog.submit')}}</el-button>
		</div>
	</el-dialog> -->
		
	<!-- auth -->
	<el-dialog width="80%" :title="$t('user.dialog.title.authMenu', {nick: userNick})" :visible.sync="authFormVisible" :close-on-click-modal="false" >
		<div v-show="!preloading" class="el-loading-mask" style="background-color: rgba(255,255,255,1);">
			<div class="el-loading-spinner">
				<i class="fa fa-spinner fa-pulse"></i>
				<p class="el-loading-text">Loading...</p>
			</div>
		</div>
		
		<el-form label-position="top" :model="authForm" :rules="authFormRules" ref="authForm" label-width="120px">
			<el-form-item v-for="(menuAuth, index) in menuOtions" :key="index" >
			<div class="auth_label" slot="label" style="label">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item v-for="(item, index2) in menuAuth.parentName" :key="index2">{{item}}</el-breadcrumb-item>
					<el-breadcrumb-item>
						{{menuAuth.name}}&nbsp;&nbsp;
						<el-checkbox 
							:disabled="menuAuth.disabled" 
							:indeterminate="menuAuth.isIndeterminate" 
							v-model="menuAuth.checkAll" 
							@change="(val) => {handleCheckAllChange(val, menuAuth);}">
							{{$t('user.button.selectAll')}}
						</el-checkbox>
					</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<el-checkbox-group v-model="authForm[menuAuth.id]" @change="(val) => {handleCheckedChange(val, menuAuth);}">
				<template v-for="(item, index2) in menuAuth.children">
					<el-tooltip :key="index2" class="item" effect="dark" :disabled="!item.describe" placement="right">
						<div slot="content" v-html="item.describe"></div>
						<el-checkbox border :label="item.id" :disabled="menuAuth.disabled ? true : item.status ? false : true">{{item.name}}</el-checkbox>
					</el-tooltip>
				</template>
			</el-checkbox-group>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="authClose">{{$t('page.dialog.cancel')}}</el-button>
			<el-button type="primary" @click="authSubmit" :loading="authLoading">{{$t('page.dialog.submit')}}</el-button>
		</div>
	</el-dialog>
</template>

<script>


import { USER_AUTH, AUTH_MENU, AUTH_MENU_UPDATE } from "@/api";

export default {
	data: function() {
		return {
			preloading: false,
			authFormVisible: false,
			authLoading: false,
			authForm: {},
			authFormRules: {},
			menuOtions: [],
			userId: "",
			userNick: "",
		}
	},
  
	methods: {
		handleAuthMenu: async function (index, row) {
			this.userId = row.id;
			this.userNick = row.nick || row.username;
			this.authFormVisible = true;
			this.authLoading = false;
			let loginAuth = await USER_AUTH();
			let userAuth = await AUTH_MENU({userId: row.id});
			let loginMenus = loginAuth.data.menus; //授权人的菜单
			let loginBtns = loginAuth.data.btns; //授权人的按钮
			let userBtns = userAuth.data.btns; //被授权人的按钮
			//去除父级菜单
			let parentMenu = {};
			this.menuOtions = [];
			for (let i = 0; i < loginMenus.length; i++) {
				let id = loginMenus[i].id;
				if(parentMenu[id]){
					continue; //已是父级
				}
				for (let j = 0; j < loginMenus.length; j++) {
					if(id == loginMenus[j].parentId){
						parentMenu[id] = loginMenus[i];
						break;
					}
				}
				if(!parentMenu[id]){ //叶子节点
					let node = Object.assign({}, loginMenus[i]);
					node.parentName = [];
					node.disabled = false;
					node.checkAll = false;
					node.isIndeterminate = false;
					node.checked = [];
					node.children = [];
					node.allItem = [];
					this.menuOtions.push(node);
				}
			} 
			//组装数据
			for (let i = 0; i < this.menuOtions.length; i++) {
				let node = this.menuOtions[i];
				//加入父级
				node.parentName = this.findParant(node.parentId, parentMenu).reverse();
				//加入按钮
				node.children = this.findChildren(node.id, loginBtns);
				//默认选中
				for (let m = 0; m < node.children.length; m++) {
					const id = node.children[m].id;
					node.allItem.push(id); //全部
					for (let n = 0; n < userBtns.length; n++) {
						if(id == userBtns[n].menuBtnId){
							node.checked.push(id);
							break;
						}
					}
				}
				//选中状态
				if(node.checked.length != 0){
					node.checkAll = node.checked.length === node.allItem.length;
					node.isIndeterminate = node.checked.length > 0 && node.checked.length < node.allItem.length;
				}
				//双向绑定
				this.$set(this.authForm, node.id, node.checked);
			}
			console.log(this.menuOtions);
			console.log(this.authForm);
			this.preloading = true;
		},
		findParant(parentId, parentMap){
			if(!parentMap[parentId]){
				return [];
			}
			let array = [parentMap[parentId].name];
			if(parentMap[parentId].parentId){
				array = array.concat(this.findParant(parentMap[parentId].parentId, parentMap));
			}
			return array;
		},
		findChildren(menuId, btns){
			let array = [];
			for (let i = 0; i < btns.length; i++) {
				if(btns[i].menuId == menuId){
					array.push(btns[i]);
				}
			}
			return array;
		},
		authClose: function () {
			this.authFormVisible = false;
			this.authLoading = false;
			this.preloading = false;
			this.$refs.authForm.resetFields();
		},
		authSubmit: function () {
			this.$refs.authForm.validate((valid) => {
				if (valid) {
					this.$confirm(i18n.t('page.confirm.content'), i18n.t('page.confirm.title'), {}).then(() => {
						this.authLoading = true;
						let params = {
							userId: this.userId,
							config: JSON.stringify(this.authForm)
						};
						AUTH_MENU_UPDATE(params).then(res => {
							this.authLoading = false;
							this.authFormVisible = false;
							this.preloading = false;
                			this.$emit('ok');
						}).catch(error => {
							this.authLoading = false;
						});
					});
				}
			});
		},
		handleCheckAllChange: function(val, item){
			this.authForm[item.id] = val ? item.allItem : [];
			item.isIndeterminate = false;
		},
		handleCheckedChange(val, item) {
			let checkedCount = val.length;
			item.checkAll = checkedCount === item.allItem.length;
			item.isIndeterminate = checkedCount > 0 && checkedCount < item.allItem.length;
		},
  	},
  	mounted: function() {
		
	}
}
</script>

<style>
.el-breadcrumb {
    line-height: 19px;
}
</style>