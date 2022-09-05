<template>
    <div class="backdrop" @click.self="closeModal">
        <div class="forum-create">
            <form @submit.prevent="handleSubmit">
                <h1>Create a New Forum</h1>
                <label>Forum Title</label>
                <input type="title" required v-model="title">

                <label>Description</label>
                <!-- <input type="description" required v-model="description"> -->
                <textarea class="form-control" required v-model="description"></textarea>
                <div class="submit">
                    <button class="btn btn-md btn-primary" @click.prevent="handleSubmit">Create Forum</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            title: null,
            description: null
        }
    },
    methods: {
        closeModal() {
            this.$emit('close')
        },
        handleSubmit() {
            var postData = {
                title: this.title,
                description: this.description,
            };

            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Accept': 'application/json',
                    Authorization: `Bearer ` + this.$store.state.token
                }
            };

            axios.post(process.env.VUE_APP_API_ENDPOINT + '/api/create-forum', postData, axiosConfig)
                .then((res) => {
                    this.closeModal();
                    alert('Forum Succesfully Created')
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err)
                })
        }
    }
}
</script>

<style>
.forum-create {
    width: 400px;
    margin: 100px auto;
    background: white;
    border-radius: 10px;
    display: inline-block;
}

.backdrop {
    top: 0;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
}

textarea {
    height: 100px;
}
</style>