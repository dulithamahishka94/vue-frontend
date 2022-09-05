<template>
	<nav>
		<router-link to="/" v-if="!$store.state.loggedIn">Login |</router-link>
		<router-link to="/register" v-if="!$store.state.loggedIn">Register |</router-link>
		<router-link to="/forum" v-if="$store.state.loggedIn">Forum |</router-link>
		<button v-if="$store.state.loggedIn" @click="logOut" class="btn btn-danger">Logout</button>
	</nav>
	<h3 v-if="$store.state.loggedIn">User : {{$store.state.name}}</h3>
	<router-view/>
</template>
<script>

export default {
	data() {
		return {}
	},
	methods: {
		logOut() {
			this.$store.commit('SET_LOGGED_IN', false)
			this.$store.commit('UPDATE_API_TOKEN', '')
			this.$router.push({name: 'login'})
		}
	}
}
</script>
<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

nav {
	padding: 30px;
}

nav a {
	font-weight: bold;
	color: #2c3e50;
	text-decoration: none;
}

nav a.router-link-exact-active {
	color: #42b983;
}
</style>
