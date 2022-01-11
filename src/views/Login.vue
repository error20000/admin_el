<template>
	<div style="padding-top: 80px;">
		<el-form
			size="medium"
			:model="ruleForm"
			:rules="rules"
			ref="ruleForm"
			label-position="left"
			label-width="0px"
			class="demo-ruleForm login-container"
		>
			<h3 class="title">{{$t('login.title')}}</h3>
			<el-form-item prop="username">
				<el-input
					type="text"
					v-model="ruleForm.username"
					prefix-icon="fa fa-user"
					:placeholder="$t('login.placeholder.username')"
				></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input
					type="password"
					v-model="ruleForm.password"
					prefix-icon="fa fa-key"
					:placeholder="$t('login.placeholder.password')"
					@keyup.native.enter="handleSubmit"
				></el-input>
			</el-form-item>
			<!-- <el-checkbox v-model="checked" checked class="remember">remember password </el-checkbox> -->
			<el-form-item style="width:100%;">
				<el-button
					type="primary"
					style="width:100%;"
					@click.native.prevent="handleSubmit"
					:disabled="logining"
				>{{$t('login.button.login')}}</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { ADD_HEADER, USER_LOGIN, USER_AUTH } from "@/api";

export default {
	data: function() {
		return {
			logining: false,
			ruleForm: {
				username: "",
				password: ""
			},
			rules: {
				username: [
					{
						required: true,
						message: i18n.t("login.rules.username"),
						trigger: "blur"
					}
				],
				password: [
					{
						required: true,
						message: i18n.t("login.rules.password"),
						trigger: "blur"
					}
				]
			},
			checked: true
		};
	},
	methods: {
		handleChangeLang: function() {

		},
		handleSubmit: function(ev) {
			this.$refs.ruleForm.validate(valid => {
				if (valid) {
					this.logining = true;
					var params = {
						username: this.ruleForm.username,
						password: this.ruleForm.password
					};
                    USER_LOGIN(params).then((res) => {
                        this.logining = false;
						//header
						ADD_HEADER(window.e.tokenName, res.data[window.e.tokenName]);
						//本地存储
						localStorage.setItem(window.e.tokenName, res.data[window.e.tokenName]);
						localStorage.setItem(window.e.tokenUser, JSON.stringify(res.data['user']));
						//读取用户权限
						USER_AUTH().then(res => {
							//本地存储
							localStorage.setItem(window.e.userAuth, JSON.stringify(res.data));
							//跳转
							this.$router.push(window.e.page.index);
						});
					}).catch(error => {
                        this.logining = false;
						console.log(error);
                    });
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
	},
	mounted: function() {

	}
};
</script>

<style scoped lang="scss">
.login-container {
	/*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
	-webkit-border-radius: 5px;
	border-radius: 5px;
	-moz-border-radius: 5px;
	background-clip: padding-box;
	margin: auto;
	width: 350px;
	padding: 35px 35px 15px 35px;
	background: #fff;
	border: 1px solid #eaeaea;
	box-shadow: 0 0 25px #cac6c6;
}

.login-container .title {
	margin: 0px auto 40px auto;
	text-align: center;
	color: #505458;
}

.login-container .remember {
	margin: 0px 0px 35px 0px;
}

.el-message-box {
	width: 70% !important;
}
</style>