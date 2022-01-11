<template>
	<!-- edit -->
	<el-dialog :title="$t('label.title.edit')" :visible.sync="editFormVisible" :close-on-click-modal="false">	
		<edit :fields="fields" :rules="rules" ref="editForm">
			<!-- 通过 slot 自定义 -->
			<template v-slot:select_type>
				<el-option-group
					v-for="group in typeOptions"
					:key="group.label"
					:label="group.label">
					<el-option
						v-for="item in group.options"
						:key="item.id"
						:label="item.name"
						:value="item.id">
						<span style="float: left">{{ item.name }}</span>
						<span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
					</el-option>
				</el-option-group>
			</template>
		</edit>
		<el-form :model="editFormExt" :rules="rulesExt" ref="editFormExt" label-width="120px">
			<el-form-item :label="$t('job.fields.jobContent')" :prop="editFormExt.jobContent" >
				<el-input type="textarea" v-model="editFormExt.jobContent" :rows="7"></el-input>
			</el-form-item>
			<el-form-item :label="$t('job.fields.jobSkill')" :prop="editFormExt.jobSkill" >
				<el-input type="textarea" v-model="editFormExt.jobSkill" :rows="7"></el-input>
			</el-form-item>
			<el-form-item :label="$t('job.fields.jobExperience')" :prop="editFormExt.jobExperience" >
				<el-input type="textarea" v-model="editFormExt.jobExperience"></el-input>
			</el-form-item>
			<el-form-item :label="$t('job.fields.jobDegree')" :prop="editFormExt.jobDegree" >
				<el-input type="textarea" v-model="editFormExt.jobDegree"></el-input>
			</el-form-item>
			<el-form-item :label="$t('job.fields.jobEmail')" :prop="editFormExt.jobEmail" >
				<el-input type="textarea" v-model="editFormExt.jobEmail"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="editClose">{{$t('dialog.cancel')}}</el-button>
			<el-button type="primary" @click="editSubmit" :loading="editLoading">{{$t('dialog.submit')}}</el-button>
		</div>
	</el-dialog>
</template>

<script>


import fields from "./config/fields.js";
import rules from "./config/rulesEdit.js";
import { JOB_ONE, JOB_EDIT } from "@/api";
import Edit from "@/components/form/Edit.vue";

export default {
    components: {
      Edit,
    },
	props: {
		typeOptions: {
			type: Array
		}
	},
	data: function() {
		return {
			editFormVisible: false,
			editLoading: false,
			rules: rules,
			fields: fields,

			editFormExt: {
				jobContent: "",
				jobSkill: "",
				jobExperience: "",
				jobDegree: "",
				jobEmail:""
			},
			rulesExt:{},
		}
	},
  
	methods: {
		//修改
		handleEdit: function (index, row) {
			let params = {
				id: row.id
			};
			JOB_ONE(params).then(res => {
				this.editFormVisible = true;
				this.editLoading = false;
				this.editFormExt = res.data.content ? JSON.parse(res.data.content) : {};
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
						params.content = JSON.stringify(this.editFormExt);
						JOB_EDIT(params).then(res => {
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