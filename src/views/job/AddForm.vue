<template>
	<!-- add -->
	<el-dialog :title="$t('label.title.add')" :visible.sync="addFormVisible" :close-on-click-modal="false">	
		<add :fields="fields" :rules="rules" ref="addForm">
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
		</add>
		<el-form :model="addFormExt" :rules="rulesExt" ref="addFormExt" label-width="120px">
			<el-form-item :label="$t('job.fields.jobContent')" :prop="addFormExt.jobContent" >
				<el-input type="textarea" v-model="addFormExt.jobContent" :rows="7"></el-input>
			</el-form-item>
			<el-form-item :label="$t('job.fields.jobSkill')" :prop="addFormExt.jobSkill" >
				<el-input type="textarea" v-model="addFormExt.jobSkill" :rows="7"></el-input>
			</el-form-item>
			<el-form-item :label="$t('job.fields.jobExperience')" :prop="addFormExt.jobExperience" >
				<el-input type="textarea" v-model="addFormExt.jobExperience"></el-input>
			</el-form-item>
			<el-form-item :label="$t('job.fields.jobDegree')" :prop="addFormExt.jobDegree" >
				<el-input type="textarea" v-model="addFormExt.jobDegree"></el-input>
			</el-form-item>
			<el-form-item :label="$t('job.fields.jobEmail')" :prop="addFormExt.jobEmail" >
				<el-input type="textarea" v-model="addFormExt.jobEmail"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="addClose">{{$t('dialog.cancel')}}</el-button>
			<el-button type="primary" @click="addSubmit" :loading="addLoading">{{$t('dialog.submit')}}</el-button>
		</div>
	</el-dialog>
</template>

<script>


import fields from "./config/fields.js";
import rules from "./config/rulesAdd.js";
import { JOB_ADD } from "@/api";
import Add from "@/components/form/Add.vue";

export default {
    components: {
      Add,
    },
	props: {
		typeOptions: {
			type: Array
		}
	},
	data: function() {
		return {
			addFormVisible: false,
			addLoading: false,  
			rules: rules,
			fields: fields,

			addFormExt: {
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
		//新增
		handleAdd: function(){
			this.addFormVisible = true;
			this.addLoading = false;
			let def = {
				sort: 999,
				status: 1,
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
						params.content = JSON.stringify(this.addFormExt);
						JOB_ADD(params).then(res => {
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