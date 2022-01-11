<template>
	<!-- add -->
	<el-dialog :title="$t('label.title.add')" :visible.sync="addFormVisible" :close-on-click-modal="false">	
		<add :fields="fields" :rules="rules" ref="addForm"></add>
		<div slot="footer" class="dialog-footer">
			<el-button @click="addClose">{{$t('dialog.cancel')}}</el-button>
			<el-button type="primary" @click="addSubmit" :loading="addLoading">{{$t('dialog.submit')}}</el-button>
		</div>
	</el-dialog>
</template>

<script>


import fields from "./config/fields.js";
import rules from "./config/rulesAdd.js";
import { JOB_TYPE_ADD } from "@/api";
import Add from "@/components/form/Add.vue";

export default {
    components: {
      Add,
    },
	data: function() {
		return {
			addFormVisible: false,
			addLoading: false,  
			rules: rules,
			fields: fields,
		}
	},
  
	methods: {
		//新增
		handleAdd: function(){
			this.addFormVisible = true;
			this.addLoading = false;
			let def = {
				sort: 999
			};
			this.$nextTick(() => {
				this.$refs.addForm.setFormData(def);
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
					this.$confirm(i18n.t('confirm.content'), i18n.t('confirm.title'), {}).then(() => {
						this.addLoading = true;
						let params = Object.assign({}, this.$refs.addForm.getFormData());
						JOB_TYPE_ADD(params).then(res => {
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