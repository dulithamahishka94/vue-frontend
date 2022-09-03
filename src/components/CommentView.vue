<template>
    <div class="backdrop" @click.self="closeComment">
        <div class="forum-create">
            <div class="comment-view">
                <h1>Comments</h1>
                <ul class="list-group" v-for="comment in commentList" :key="comment.id">
                    <li class="list-group-item comment-item">
                        <p>{{ comment.comment }}</p>
                        <p class="user-name">{{ comment.name }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            commentList: null,
            forum_id: null,
        };
    },
    props: ["forum_id", "commentList"],
    methods: {
        closeComment() {
            this.$emit("close");
        },
    },
};
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

.comment-view {
    padding: 10px;
}

.comment-item {
    margin-bottom: 5px;
    text-align: left;
}

.user-name {
    font-weight: 600;
}
</style>