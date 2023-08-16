<script setup>
import PageLoading from '../components/PageLoading.vue'
</script>


<template>
    <div>
        <div class="temas">
            <PageLoading v-if="loading" />
            <div class="temasList">
                <div :class="(tag === 0) ? 'tag active' : 'tag'" @click="changeTema(0)">
                    all
                </div>
                <div v-for="t in tags" :key="t.id" :class="(tag === t.id) ? 'tag active' : 'tag'" @click="changeTema(t.id)">
                    #{{ t.name }}
                </div>
            </div>
            <div class="overlayLoading" v-show="changingTag">
                <span v-if="error">{{ error }}</span>
                <span v-else>Loading...</span>
            </div>
            <div class="tema" v-for="m in posts" :key="m.id" :id="m.id">
                <div class="content">
                    <div class="date" v-html="m.created_date"></div>
                    <div class="text" v-html="m.text"></div>

                </div>
                <div class="postTag">
                    <span>{{ m.tag }}</span>
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
            changingTag: false,
            posts: [],
            error: null,
            tags: [],
            tag: 0
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
    methods: {
        async fetchData() {
            this.loading = true // Set loading to true when starting data fetching

            try {
                var response = await fetch('https://4a73734eb4.pythonanywhere.com/api/temas')
                var tposts = await response.json()
                this.posts = tposts.reverse()

                var response = await fetch('https://4a73734eb4.pythonanywhere.com/api/tags')
                var msg = await response.json()
                this.tags = msg

                this.loading = false
            } catch (error) {
                setTimeout(() => {
                    location.reload()
                }, 2000)
            }
        },
        async changeTema(tema) {
            this.tag = tema
            this.changingTag = true
            try {
                if (tema == 0) {
                    var response = await fetch('https://4a73734eb4.pythonanywhere.com/api/temas')

                } else {
                    var response = await fetch('https://4a73734eb4.pythonanywhere.com/api/temas?tagId=' + tema)
                }
                var msg = await response.json()
                this.posts = msg.reverse()
                this.changingTag = false
            } catch (error) {
                this.error = 'not found. going to all temas... in 3 seconds'
                setTimeout(() => {
                    this.changeTema(0)
                }, 3000)


            }
        }

    }
}

</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');



div.overlayLoading {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgb(0, 0, 0, 0.8);
    z-index: 8888;
    display: flex;
    justify-content: center;
    padding-top: 2rem;
}

div.temas {
    width: 100%;
    position: relative;
}

img:hover {
    cursor: pointer;
}

div.tema {
    max-width: 45rem;
    margin: 2rem auto 2rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    border-top: 1px solid rgb(93, 92, 92);
    transition: 1s box-shadow ease;
    position: relative;
    scroll-margin-top: 70px;
}

div.temas>div.temasList {
    max-width: 45rem;
    margin: 2rem auto 2rem;
    display: flex;
    overflow-x: auto;
    padding: .6rem 5px;
    position: sticky;
    top: 70px;
    background-color: #00000000;
    z-index: 999;
    backdrop-filter: saturate(100%) blur(15px);
    transition: background-color 0.1 ease-in-out;
}


/* Dark theme scrollbar */
div.temas>div.temasList::-webkit-scrollbar {
    height: 4px;
    background-color: #222;
}

/* Dark theme scrollbar handle */
div.temas>div.temasList::-webkit-scrollbar-thumb {
    height: 4px;
    background-color: #444;
}

/* Dark theme scrollbar handle on hover */
div.temas>div.temasList::-webkit-scrollbar-thumb:hover {
    background-color: #666;
}

div.temas>div.temasList>.tag {
    font-family: 'Roboto Mono', monospace;
    border: 1px solid #fafafa;
    padding: 5px;
    border-radius: 5px;
    font-size: 10pt;
    transition: all .5s ease;
}

div.temas>div.temasList>.tag:not(:first-child) {
    margin-left: 1rem;
}


div.temas>div.temasList>.tag:hover,
div.temas>div.temasList>.active {
    cursor: pointer;
    background: #fafafa;
    color: #000;
    transition: all .5s ease;
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

div.postTag>span {
    border: 1px solid #fafafa;
    padding: 5px;
    border-radius: 7px;
    font-size: 7pt;
}

div.text img {
    max-width: 100%;
}
</style>