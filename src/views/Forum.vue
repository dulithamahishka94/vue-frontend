<template>
    <div class="about">
        <div class="container">
            <div class="col-md-12" v-if="showAlert">
                <div class="alert alert-success" role="alert">
                    {{ alertMessage }}
                </div>
            </div>
            <div class="col-md-12">
                <div class="col-md-7">
                    <input type="text" class="form-control">
                    <a href="#" class="btn-success btn btn-sm create-forum" @click="toggleModal">Create Forum</a>
                </div>
                <div class="col-md-5">
                </div>
            </div>
        </div>
        <div class="container">
            <div class="col-md-12 card card-style" v-for="forum in forumList" :key="forum.id">
                <div class="card-header">
                    <h5 class="card-title">{{ forum.title }}</h5>
                </div>
                <div class="card-body">
                    <p class="card-text">{{ forum.description }}</p>
                    <a href="#" class="btn btn-primary card-link-forum" @click="toggleComment(forum.id)">Add Comment</a>
                    <a href="#" @click="toggleCommentView(forum.id)" class="btn btn-primary card-link-forum">View
                        Comments</a>
                    <span v-if="adminStatus && !forum.approved">
						<a href="#" class="btn btn-success card-link-forum"
                           @click="approveForum(forum.id, true, 'approve')">Approve</a>
						<a href="#" class="btn btn-danger card-link-forum"
                           @click="approveForum(forum.id, false, 'reject')">Reject</a>
					</span>
                    <span v-if="!adminStatus && userId == forum.user_id">
            			<a href="#" class="btn btn-danger card-link-forum" @click="deleteForum(forum.id, 'delete')">Delete</a>
          			</span>
                </div>
            </div>
        </div>
    </div>
    <div v-if="showModal">
        <ForumCreate @close="toggleModal"/>
    </div>

    <div v-if="showComment">
        <CommentCreate @close="toggleComment" :forum_id="forum_id" :confirmation="confirmationType"/>
    </div>

    <div v-if="showConfirmation">
        <Confirmation @close="toggleConfirmation($event)" :forum_id="forum_id" :status="status"/>
    </div>

    <div v-if="showCommentView">
        <CommentView @close="toggleCommentView" :forum_id="forum_id" :commentList="commentList"/>
    </div>
</template>

<script>
import ForumCreate from "../components/ForumCreate.vue";
import CommentCreate from "../components/CommentCreate.vue";
import Confirmation from "../components/ConfirmationModal.vue";
import CommentView from "../components/CommentView.vue";

import axios from "axios";

export default {
    data() {
        return {
            showModal: false,
            showComment: false,
            forumList: [],
            forum_id: null,
            status: false,
            showAlert: false,
            showConfirmation: false,
            alertMessage: null,
            confirmationType: null,
            adminStatus: false,
            userId: null,
            showCommentView: false,
            commentList: []
        };
    },
    components: {ForumCreate, CommentCreate, Confirmation, CommentView},
    beforeCreate() {
        console.log('state',this.$store.state.loggedIn);
        if (!this.$store.state.loggedIn) {
            this.$router.push({name: "login"});
        }
    },
    mounted() {
        this.forums();
    },
    methods: {
        toggleModal() {
            this.showModal = !this.showModal;
            this.forums();
            console.log(this.showModal);
        },
        toggleComment(forum_id) {
            this.showComment = !this.showComment;
            this.forum_id = forum_id;
            this.forums();
            console.log(this.forum_id);
        },
        toggleCommentView(forum_id) {
            this.showCommentView = !this.showCommentView;

            if (this.showCommentView) {
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
                        "http://localhost/Ascentic/laravel-backend/public/api/view-comments",
                        postData,
                        axiosConfig
                    )
                    .then((res) => {
                        this.commentList = res.data.data
                        // console.log("RESPONSE RECEIVED: ", res.data.data);
                        this.closeComment();
                    })
                    .catch((err) => {
                        console.log("AXIOS ERROR: ", err);
                    });
            }
            this.forum_id = forum_id;
            this.forums();
            console.log(this.forum_id);
        },
        toggleConfirmation(confirmStatus) {
            this.showConfirmation = !this.showConfirmation;
            this.forums();
            if (confirmStatus) {
                this.showAlert = true;
            } else {
                this.showAlert = false;
            }

            if (this.confirmationType == "approve") {
                this.alertMessage = "Succesfully approved";
            } else if (this.confirmationType == 'delete') {
                this.alertMessage = "Succesfully deleted";
            } else {
                this.alertMessage = "Succesfully rejected";
            }

            console.log('confirmation type ', this.confirmationType);
        },
        approveForum(forum_id, status, approveType) {
            this.showConfirmation = true;
            this.forum_id = forum_id;
            this.status = status;
            this.confirmationType = approveType;
        },
        deleteForum(forum_id, status) {
            this.showConfirmation = true;
            this.forum_id = forum_id;
            this.confirmationType = status;
        },
        forums() {
            var postData = {};

            let axiosConfig = {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Accept: "application/json",
                    Authorization: `Bearer ` + this.$store.state.token,
                },
            };

            axios
                .post(
                    "http://localhost/Ascentic/laravel-backend/public/api/list",
                    postData,
                    axiosConfig
                )
                .then((res) => {
                    // console.log("RESPONSE RECEIVED: ", res);
                    this.forumList = res.data.data;
                    this.adminStatus = res.data.isAdmin;
                    this.userId = res.data.user.id;
                    // console.log(res.data.data);
                    // this.closeModal();
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                });
        },
    },
};
</script>


<style>
.create-forum {
    float: right;
    margin-bottom: 10px;
}

.card-style {
    margin-bottom: 10px;
    text-align: left;
}

.card-link-forum {
    margin: 0 10px 0 0;
}
</style>
