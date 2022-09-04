<template>
    <div class="backdrop" @click.self="closeComment">
        <div class="forum-create">
            <form @submit.prevent="handleSubmit">
                <h1>Create a New Comment</h1>
                <label>Comment</label>
                <!-- <input type="description" required v-model="description"> -->
                <textarea class="form-control" required v-model="comment"></textarea>
                <div class="submit">
                    <button class="btn btn-md btn-primary" @click.prevent="handleSubmit(forum_id)">Add Comment</button>
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
            comment: null,
        }
    },
    props: ['forum_id'],
    methods: {
        closeComment() {
            this.$emit('close')
        },
        handleSubmit(forum_id) {
            var postData = {
                comment: this.comment,
                forum_id: forum_id,
            };

            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Accept': 'application/json',
                    Authorization: `Bearer ` + this.$store.state.token
                }
            };

            axios.post('http://localhost/Ascentic/laravel-backend/public/api/create-comment', postData, axiosConfig)
                .then((res) => {
                    this.closeComment();
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
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