<template>
    <div class="about">
        <div class="container">
            <div class="col-md-12" v-if="showAlert">
                <div class="alert alert-success" role="alert">
                    {{ alertMessage }}
                </div>
            </div>
            <div class="d-flex flex-row-reverse mt-5">
                <a href="#" class="btn-success btn create-forum" @click="toggleModal">Create Forum</a>
                <div class="col-md-4">
                    <div class="input-group">
                        <input type="text" class="form-control border-radius-none" placeholder="Search by title" v-model="searchText">
                        <div class="input-group-append">
                            <button class="btn btn-primary border-radius-none" type="button" @click="searchForums">Search</button>
                            <button class="btn btn-danger margin-right-25 border-radius-none" type="button" @click="forums(null)">X</button>
                        </div>
                    </div>
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
            commentList: [],
            searchText:  null
        };
    },
    components: { ForumCreate, CommentCreate, Confirmation, CommentView },
    beforeCreate() {
        if (!this.$store.state.loggedIn) {
            this.$router.push({name: "login"});
        }
    },
    mounted() {
        this.forums(null);
    },
    methods: {
        toggleModal() {
            this.showModal = !this.showModal;
            this.forums();
        },
        toggleComment(forum_id) {
            this.showComment = !this.showComment;
            this.forum_id = forum_id;
            this.forums();
        },
        toggleCommentView(forum_id) {
            this.showCommentView = !this.showCommentView;
            this.hiddenClass = 'hidden'
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
                        process.env.VUE_APP_API_ENDPOINT + "/api/view-comments",
                        postData,
                        axiosConfig
                    )
                    .then((res) => {
                        this.hiddenClass = ''
                        this.commentList = res.data.data
                    })
                    .catch((err) => {
                        console.log("AXIOS ERROR: ", err);
                    });
            }
            this.forum_id = forum_id;
            this.forums();
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
            this.status = status;
            this.confirmationType = status;
        },
        forums(search) {

            // Search text to be removed when loading all forums or clicking x on search.
            if (search == null) {
                this.searchText = ''
            }

            var postData = {
                search: search
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
                    process.env.VUE_APP_API_ENDPOINT + "/api/list",
                    postData,
                    axiosConfig
                )
                .then((res) => {
                    this.forumList = res.data.data;
                    this.adminStatus = res.data.isAdmin;
                    this.userId = res.data.user.id;
                })
                .catch((err) => {
                    if (err.code == "ERR_BAD_REQUEST") {
                        alert('Unauthorized access')
                    }
                    console.log("AXIOS ERROR: ", err);
                });
        },
        searchForums() {
            this.forums(this.searchText)
        }
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

.margin-right-25 {
    margin-right: 25px;
}

.border-radius-none {
    border-radius: 0 !important;
}
</style>
