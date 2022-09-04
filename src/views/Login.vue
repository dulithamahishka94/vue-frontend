<template>
    <div v-if="true">
        <h1>Login</h1>
        <!-- <h1>Login {{ $store.state.firstName }} {{ $store.state.lastName }}</h1> -->
        <form @submit.prevent="handleSubmit">
            <label>Email</label>
            <input type="email" required v-model="email" @keypress="passwordsNotMatch=false">

            <label>Password</label>
            <input type="password" required v-model="password" @keypress="passwordsNotMatch=false">
            <label v-if="passwordsNotMatch" class="error">Unauthorized</label>

            <div class="submit">
                <button class="btn btn-md btn-primary" @click.prevent="loginUser">Login</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    components: {},
    data() {
        return {
            email: null,
            password: null,
            showLogin: true,
            passwordsNotMatch: false
        }
    },
    beforeCreate() {
        if (this.$store.state.loggedIn) {
            this.$router.push({name: "forum"});
        }
    },
    methods: {
        loginUser() {
            var postData = {
                email: this.email,
                password: this.password,
                login: false
            };

            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Accept': 'application/json',
                }
            };

            axios.post('http://localhost/Ascentic/laravel-backend/public/api/login', postData, axiosConfig)
                .then((res) => {
                    if (res.data.data.status) {
                        this.$store.dispatch('addToken', res.data.data.token)
                        this.$store.dispatch('setLoggedIn', true)
                        this.$store.dispatch('setName', res.data.data.user.name)
                        this.$router.push({name: 'forum'})
                    }

                    // If username or password is wrong.
                    if (res.data.response_code === 401) {
                        this.passwordsNotMatch = true
                    }
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err)
                })
        }
    },
    beforeCreate() {
        if (this.$store.state.loggedIn) {
            this.$router.push({name: 'forum'})
        }
    }
}
</script>

<style>
form {
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
}

label {
    color: #aaa;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}

input,
select {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
}

input[type="checkbox"] {
    display: inline-block;
    position: relative;
    width: 16px;
    margin: 0 10px 0 0;
    top: 2px;
}

.pill {
    display: inline-block;
    margin: 20px 10px 0 0;
    padding: 6px 12px;
    background: #eee;
    border-radius: 20px;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: bold;
    color: #777;
    cursor: pointer;

}

.submit {
    margin-top: 10px;
}

.error {
	color: red;
}

</style>
