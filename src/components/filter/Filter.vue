<template>
	<el-form  :inline="true" :model="filterForm">
		<template v-for="(item, name) in filters">
			<el-form-item :key="name" :label="item.label">
				<!-- 1:input -->
				<el-input v-if="!item.type || item.type == 1" v-model="filterForm[item.field]" :placeholder="item.placeholder" clearable></el-input>
				<!-- 2:select -->
				<el-select v-if="item.type == 2" v-model="filterForm[item.field]" :placeholder="item.placeholder">
					<slot :name="'select_'+item.field">
						<el-option
							v-for="item2 in item.options()"
							:key="item2.value"
							:label="item2.name"
							:value="item2.value">
						</el-option>
					</slot>
				</el-select>
			</el-form-item>
		</template>
		<slot></slot>
		<template v-if="!filters || Object.keys(filters).length != 0">
			<el-form-item>
				<el-button @click="query" :title="$t('label.title.query')" icon="fa fa-search" type="primary"></el-button>
				<el-button @click="reset" :title="$t('label.title.reset')" icon="fa fa-refresh"></el-button>
				<slot name="button"></slot>
			</el-form-item>
		</template>
	</el-form>
</template>

<script>

export default {
	props:{
		filters: {
			type: Object,
			default: function () {
				return { }
			}
    	},
	},
	data: function() {
		return {
			filterForm: {},
		}
	},
  
	methods: {
		query: function(){
			this.$emit("query", this.filterForm);
		},
		reset: function(){
			this.filterForm = {};
			this.$emit('reset', this.filterForm);
		},
  	},
  	mounted: function() {
		
	}
}
</script>

<style>

</style>