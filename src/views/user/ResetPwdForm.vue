<template>
	<!-- reset -->
	<el-dialog :title="$t('user.dialog.title.resetPwd')" :visible.sync="resetFormVisible" :close-on-click-modal="false">	
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
	</el-dialog>
</template>

<script>


import fields from "./config/fields.js";
import rules from "./config/rulesReset.js";
import { USER_RESET_PWD } from "@/api";

export default {
	data: function() {
		return {
			resetFormVisible: false,
			resetLoading: false,
			resetForm: {
				id: "",
				password: "",
				password2: "",
			},
			rules: Object.assign(rules, {
				password2: [
					{ required: true, message: i18n.t('pwd.rules.pwd2'), trigger: 'blur' },
					{ validator: (rule, value, callback) => {
						let password = this.resetForm.password;
						if (password && value !== password) {
							callback(new Error(i18n.t('pwd.rules.same')));
						} else {
							callback();
						}
					}, trigger: 'blur' }
				],
			}),
			fields: fields
		}
	},
  
	methods: {
		handleReset: function (index, row) {
			this.resetForm = {
				id: row.id,
				password: "",
				password2: "",
			};
			this.resetFormVisible = true;
			this.resetLoading = false;
			this.$nextTick(() => {
				this.$refs.resetForm.resetFields();
			});
		},
		resetClose: function () {
			this.resetFormVisible = false;
			this.resetLoading = false;
			this.$refs.resetForm.resetFields();
		},
		resetSubmit: function () {
			this.$refs.resetForm.validate((valid) => {
				if (valid) {
					this.$confirm(i18n.t('confirm.content'), i18n.t('confirm.title'), {}).then(() => {
						this.resetLoading = true;
						let params = {
							userId: this.resetForm.id,
							newPwd: this.resetForm.password,
						};
						USER_RESET_PWD(params).then(res => {
							this.resetLoading = false;
							this.resetFormVisible = false;
                			this.$emit('ok');
						}).catch(error => {
							this.resetLoading = false;
						});
					});
				}
			});
		},
  	},
  	mounted: function() {
		
	}
}
</script>

<style>

</style>