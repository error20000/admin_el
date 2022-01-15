<template>
	<!-- add -->
	<el-form :model="addForm" :rules="rules" ref="addForm" label-width="120px">
		<template v-for="(item, name) in fields">
			<el-form-item  
				v-if="showInAdd(item)" 
				:key="name"
				:label="item.name" :prop="item.field" >
				<!-- 1:input -->
				<el-input v-if="!item.form.type || item.form.type == 1" clearable v-model="addForm[item.field]" :placeholder="item.form.placeholder" :disabled="disabledInAdd(item)"></el-input>
				<!-- 2:password -->
				<el-input v-if="item.form.type == 2" type="password" show-password v-model="addForm[item.field]" :placeholder="item.form.placeholder" :disabled="disabledInAdd(item)"></el-input>	
				<!-- 3:select -->
				<el-select v-if="item.form.type == 3" v-model="addForm[item.field]" :placeholder="item.form.placeholder" :disabled="disabledInAdd(item)">
					<slot :name="'select_' + item.field">
						<el-option
							v-for="item2 in item.form.options()"
							:key="item2.value"
							:label="item2.name"
							:value="item2.value">
						</el-option>
					</slot>
				</el-select>
				<!-- 4:switch -->
				<el-switch v-if="item.form.type == 4" v-model="addForm[item.field]" :active-value="1" :inactive-value="0" :disabled="disabledInAdd(item)"></el-switch>
				<!-- 5:upload -->
				<el-input v-if="item.form.type == 5" v-model="addForm[item.field]" :placeholder="item.form.placeholder" :disabled="disabledInAdd(item)">
					<el-upload slot="append"
						:action="item.form.uploadUrl"
						:on-success="function(res, file){return handleFileUpload(res, file, 'addForm', item.field);}"
						:show-file-list="false">
						<el-button icon="el-icon-upload" :title="$t('page.title.upload')"></el-button>
					</el-upload>
				</el-input>
			</el-form-item>
		</template>
		<slot></slot>
	</el-form>
</template>

<script>


export default {
	props:{
		fields: {
			type: Object,
			default: function () {
				return { }
			}
    	},
		rules: {
			type: Object,
			default: function () {
				return { }
			}
    	},
	},
	data: function() {
		return {
			addForm: {},
		}
	},
	methods: {
		showInAdd: function(item){
			let flag = true;
			if(item.form.add && typeof item.form.add.show != "undefined"){
				flag = item.form.add.show ? true : false;
			}else if(typeof item.form.show != "undefined"){
				flag = item.form.show ? true : false;
			}else if(typeof item.show != "undefined"){
				flag = item.show ? true : false;
			}
			return flag;
		},
		disabledInAdd: function(item){
			let flag = false;
			if(item.form.add && item.form.add.disabled){
				flag = true;
			}else if(item.form.disabled){
				flag = true;
			}else if(item.disabled){
				flag = true;
			}
			return flag;
		},
		//获取表单
		form: function(){
			return this.$refs.addForm;
		},
		//获取表单数据
		getFormData: function(){
			return this.addForm;
		},
		setFormData: function(data){
			this.addForm = data || {};
		},
		clearFormData: function(){
			this.addForm = {};
		},
		//上传回调
		handleFileUpload(res, file, refName, field){
			this.$set(this.addForm, field, res.data.path);
		}
  	},
  	mounted: function() {
	}
}
</script>

<style>

</style>