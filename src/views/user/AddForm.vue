<template>
	<!-- add -->
	<el-dialog :title="$t('page.dialog.add')" :visible.sync="addFormVisible" :close-on-click-modal="false">	
		<add :fields="fields" :rules="rules" ref="addForm"></add>
		<div slot="footer" class="dialog-footer">
			<el-button @click="addClose">{{$t('page.dialog.cancel')}}</el-button>
			<el-button type="primary" @click="addSubmit" :loading="addLoading">{{$t('page.dialog.submit')}}</el-button>
		</div>
	</el-dialog>
</template>

<script>


import fields from "./config/fields.js";
import rules from "./config/rulesAdd.js";
import { USER_ADD } from "@/api";
import Add from "@/components/form/Add.vue";

export default {
    components: {
      Add,
    },
	data: function() {
		return {
			addFormVisible: false,
			addLoading: false,  
			rules: Object.assign(rules, {
				password2: [
					{ required: true, message: i18n.t('pwd.rules.pwd2'), trigger: 'blur' },
					{ validator: (rule, value, callback) => {
						let password = this.$refs.addForm.getFormData().password;
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
		//新增
		handleAdd: function(){
			this.addFormVisible = true;
			this.addLoading = false;
			this.$nextTick(() => {
				this.$refs.addForm.setFormData();
				this.$refs.addForm.form().resetFields();
			});
		},
		addClose: function () {
			this.addFormVisible = false;
			this.addLoading = false;
			this.$refs.addForm.form().resetFields();
		},
		addSubmit: function () {
			this.$refs.addForm.form().validate((valid) => {
				if (valid) {
					this.$confirm(i18n.t('page.confirm.content'), i18n.t('page.confirm.title'), {}).then(() => {
						this.addLoading = true;
						let params = Object.assign({}, this.$refs.addForm.getFormData());
						USER_ADD(params).then(res => {
							this.addLoading = false;
							this.addFormVisible = false;
                			this.$emit('ok');
						}).catch(error => {
							this.addLoading = false;
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