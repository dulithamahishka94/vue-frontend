<template>
	<div class="about">
		<h1>Register</h1>
		<form @submit.prevent="handleSubmit">
			<label>Name</label>
			<input type="name" required v-model="name">

			<label>Email</label>
			<input type="email" required v-model="email">

			<label>Password</label>
			<input type="password" required v-model="password">

			<label>Re-type Password</label>
			<input type="password" required v-model="re_password" @keypress="clearPasswordLabel">
			<label v-if="passwordsNotMatch" class="error">Passwords does not match</label>

			<div class="submit">
				<button class="btn btn-md btn-primary" @click.prevent="registerUser">Create an account</button>
			</div>
		</form>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			name: null,
			email: null,
			password: null,
			re_password: null,
			passwordsNotMatch: false
		}
	},
	methods: {
		registerUser() {
			if (this.password !== this.re_password) {
				this.passwordsNotMatch = true;
			} else {
				var postData = {
					email: this.email,
					password: this.password,
					name: this.name,
				};

				let axiosConfig = {
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Accept': 'application/json',
					}
				};

				axios.post(process.env.VUE_APP_API_ENDPOINT + '/api/register', postData, axiosConfig)
					.then((res) => {
						if (res.data.response_code == 0) {
							alert(res.data.data.exception)
						} else {
							alert('Successfully Registered')
						}

						this.$router.push({name: "login"})
					})
					.catch((err) => {
						if (err.code == "ERR_BAD_REQUEST") {
							alert('Unauthorized access')
						}

						console.log("AXIOS ERROR: ", err)
					})
			}
		},
		clearPasswordLabel() {
			this.passwordsNotMatch = false;
		}
	}
}
</script>

<style>
.error {
	color: red;
}
</style>
