<script setup>
import PageLoading from '../components/PageLoading.vue'
</script>


<template>
    <div>
        <div class="temas">
            <PageLoading v-if="loading" />
            <div class="tema tab-content" v-for="m in posts" :key="m.id" :id="m.id" :ref="'m'+m.id">
                <div class="content">
                    <div class="date" v-html="m.created_date"></div>
                    <div class="text" v-html="m.text"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['temaId'],
    data() {
        return {
            loading: false,
            posts: [],
            error: null,
            url: window.location.origin + this.$route.path
        }
    },
    created() {
        // watch the params of the route to fetch the data again
        this.$watch(
            () => this.$route.params,
            () => {
                this.fetchData()
            },
            { immediate: true }
        )
    },
    mounted() {
        this.scrollToMessage();
    },
    methods: {
        async fetchData() {
            this.loading = true // Set loading to true when starting data fetching

            try {
                var response = await fetch('https://4a73734eb4.pythonanywhere.com/api/temas')
                var tposts = await response.json()
                this.posts = tposts.reverse()

                this.loading = false
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        },
        copyText(text) {
            navigator.clipboard.writeText(text);
        },
        scrollToMessage() {
            if (this.temaId) {
                const targetMessage = this.$refs['m'+this.temaId];
                if (targetMessage) {
                    targetMessage.scrollIntoView({ behavior: 'smooth' });
                }
            }
        },
    }
}
</script>


<style>
div.temas {
    width: 100%;
}

img:hover {
    cursor: pointer;
}

div.tema {
    max-width: 45rem;
    margin: 2rem auto 2rem;
    padding: 1rem;
    display: flex;
    border-top: 1px solid rgb(93, 92, 92);
    transition: 1s box-shadow ease;
    position: relative;
    scroll-margin-top: 70px;
}

div.content>div.text {
    padding: 15px 0;
    font-family: 'Chirp', sans-serif;
    font-size: 1.1em;
    margin-top: 1rem;
}

div.content>div.date {
    font-weight: bold;
    font-size: .7rem;
}

div.text img {
    max-width: 100%;
}
</style>