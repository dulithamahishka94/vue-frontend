<template>
    <div class="backdrop" @click.self="closeModal(false)">
        <div class="forum-create">
            <form @submit.prevent="handleSubmit">
                <h1>Confirmation</h1>
                <p>Are you sure you want to confirm?</p>
                <div class="submit">
                    <a class="btn btn-md btn-primary mod-button" @click.prevent="handleSubmit(forum_id, status)">
                        Confirm
                    </a>
                    <a class="btn btn-md btn-primary mod-button" @click.self="closeModal(false)">
                        Cancel
                    </a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            title: null,
            description: null,
        };
    },
    props: ["forum_id", "status"],
    methods: {
        closeModal(status) {
            this.$emit("close", status);
        },
        handleSubmit(forum_id, status) {
            if (status != "delete") {
                var postData = {
                    forum_id: forum_id,
                    status: status,
                };

                let axiosConfig = {
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        Accept: "application/json",
                        Authorization: `Bearer ` + this.$store.state.token,
                    },
                };

                axios
                    .post(
                        process.env.VUE_APP_API_ENDPOINT + "/api/approve",
                        postData,
                        axiosConfig
                    )
                    .then((res) => {
                        this.closeModal(true);
                    })
                    .catch((err) => {
                        console.log("AXIOS ERROR: ", err);
                    });
            } else {
                var postData = {
                    forum_id: forum_id,
                };

                let axiosConfig = {
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        Accept: "application/json",
                        Authorization: `Bearer ` + this.$store.state.token,
                    },
                };

                axios
                    .post(
                        process.env.VUE_APP_API_ENDPOINT + "/api/delete-forum",
                        postData,
                        axiosConfig
                    )
                    .then((res) => {
                        this.closeModal(true);
                    })
                    .catch((err) => {
                        console.log("AXIOS ERROR: ", err);
                    });
            }
        },
    },
};
</script>

<style scope>
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

.mod-button {
    margin: 0 10px 0 0;
}
</style>