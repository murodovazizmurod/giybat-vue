<template>
    <div class="reactions">
        <span v-bind:class="(getCurrentUserReaction() == 1) ? 'reac prevent-select active' : 'reac prevent-select'"
            @click="react(1)">
            👍 {{ likes }}

        </span>

        <span v-bind:class="(getCurrentUserReaction() == 2) ? 'reac prevent-select active' : 'reac prevent-select'"
            @click="react(2)">
            ❤️ {{ heart }}
        </span>

        <span v-bind:class="(getCurrentUserReaction() == 3) ? 'reac prevent-select active' : 'reac prevent-select'"
            @click="react(3)">
            👏 {{ clap }}

        </span>
        <div v-show="limit" class="overlay"></div>
        <div v-show="limit">loading...</div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            likes: 0,
            heart: 0,
            clap: 0,
            limit: false
        };
    },
    props: ['post'],
    created() {
        // Initialize likes, heart, and clap based on post.reaction
        if (this.post && Array.isArray(this.post.reactions)) {
            this.likes = this.post.reactions[0];
            this.heart = this.post.reactions[1];
            this.clap = this.post.reactions[2];
        }
    },
    methods: {
        hasUserReacted(reactionType) {
            // Get the stored user reactions from localStorage
            const userReactions =
                JSON.parse(localStorage.getItem('userReactions')) || {};

            // Check if the user has reacted to this post and reaction type
            return userReactions[this.post.id] === reactionType;
        },
        getCurrentUserReaction() {
            // Get the stored user reactions from localStorage
            const userReactions =
                JSON.parse(localStorage.getItem('userReactions')) || {};

            // Get the current reaction for this post (if any)
            return userReactions[this.post.id];
        },
        saveUserReaction(reactionType) {
            // Get the stored user reactions from localStorage
            const userReactions =
                JSON.parse(localStorage.getItem('userReactions')) || {};

            // Store the user's reaction for this post
            userReactions[this.post.id] = reactionType;

            // Save the updated user reactions to localStorage
            localStorage.setItem('userReactions', JSON.stringify(userReactions));
        },
        removeUserReaction() {
            // Get the stored user reactions from localStorage
            const userReactions =
                JSON.parse(localStorage.getItem('userReactions')) || {};

            // Remove the user's reaction for this post
            delete userReactions[this.post.id];

            // Save the updated user reactions to localStorage
            localStorage.setItem('userReactions', JSON.stringify(userReactions));
        },
        minusReaction(current) {
            this.limit = true;
            if (current == 1) { this.likes-- }
            if (current == 2) { this.heart-- }
            if (current == 3) { this.clap-- }
            fetch(
                'https://4a73734eb4.pythonanywhere.com/api/post/' +
                this.post.id +
                '/rd/' +
                current
            ).then(e => {
                if (e.status == 200) {
                    this.limit = false;
                }
            });
        },
        plusReaction(reaction) {
            this.limit = true;
            if (reaction == 1) { this.likes++ }
            if (reaction == 2) { this.heart++ }
            if (reaction == 3) { this.clap++ }
            fetch(
                'https://4a73734eb4.pythonanywhere.com/api/post/' +
                this.post.id +
                '/ra/' +
                reaction
            ).then(e => {
                if (e.status == 200) {
                    this.limit = false;
                }
            });
        },
        react(reaction) {
            const current = this.getCurrentUserReaction()

            if (this.hasUserReacted(reaction)) {
                this.minusReaction(current);
                this.removeUserReaction();
            }
            if (!(current)) {
                this.saveUserReaction(reaction);
                this.plusReaction(reaction)
            } else if (current != reaction) {
                this.saveUserReaction(reaction);
                this.minusReaction(current);
                this.plusReaction(reaction);
            }
        }
    }
};
</script>
  


<style>
div.reactions {
    position: relative;
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

div.reactions>span.reac {
    border: 1px solid rgb(200, 194, 194);
    border-radius: 10px;
    padding: 3px;
    min-width: 4rem;
    text-align: center;
    margin: 5px;
}

div.reactions>span.reac:hover {
    background-color: #5c6068;
    color: #fafafa;
    cursor: pointer;
}

div.reactions>span.active {
    background-color: #373c47;
    color: #fafafa;
    background-blend-mode: hue;
}

div.reactions>div.overlay {
    position: absolute;
    inset: 0;
    background-color: #fafafa;
    opacity: 0;
}
</style>