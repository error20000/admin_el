<template>
	<!-- edit -->
	<el-dialog :title="$t('label.title.edit')" :visible.sync="editFormVisible" :close-on-click-modal="false">	
		<edit :fields="fields" :rules="rules" ref="editForm"></edit>
		<div slot="footer" class="dialog-footer">
			<el-button @click="editClose">{{$t('dialog.cancel')}}</el-button>
			<el-button type="primary" @click="editSubmit" :loading="editLoading">{{$t('dialog.submit')}}</el-button>
		</div>
	</el-dialog>
</template>

<script>


import fields from "./config/fields.js";
import rules from "./config/rulesEdit.js";
import { JOB_TYPE_ONE, JOB_TYPE_EDIT } from "@/api";
import Edit from "@/components/form/Edit.vue";

export default {
    components: {
      Edit,
    },
	data: function() {
		return {
			editFormVisible: false,
			editLoading: false,
			rules: rules,
			fields: fields
		}
	},
  
	methods: {
		//修改
		handleEdit: function (index, row) {
			let params = {
				id: row.id
			};
			JOB_TYPE_ONE(params).then(res => {
				this.editFormVisible = true;
				this.editLoading = false;
				this.$nextTick(() => {
					this.$refs.editForm.setFormData(res.data);
					this.$refs.editForm.form().resetFields();
				});
			});
		},
		editClose: function () {
			this.editFormVisible = false;
			this.editLoading = false;
			this.$refs.editForm.form().resetFields();
		},
		editSubmit: function () {
			this.$refs.editForm.form().validate((valid) => {
				if (valid) {
					this.$confirm(i18n.t('confirm.content'), i18n.t('confirm.title'), {}).then(() => {
						this.editLoading = true;
						let params = Object.assign({}, this.$refs.editForm.getFormData());
						JOB_TYPE_EDIT(params).then(res => {
							this.editLoading = false;
							this.editFormVisible = false;
                			this.$emit('ok');
						}).catch(error => {
							this.editLoading = false;
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