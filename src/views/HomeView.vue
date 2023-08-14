<script setup>
import Loading from '../components/Loading.vue'
import Posts from '../components/Posts.vue';
</script>

<template>
  <div class="page" id="postsContainer">
    <Loading v-if="loading" />
    <Posts :posts="posts" />
  </div>
</template>


<script>
export default {
  data() {
    return {
      loading: false,
      posts: [],
      error: null
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
        var response = await fetch('https://4a73734eb4.pythonanywhere.com/api/posts')
        var posts = await response.json()
        var posts = posts.reverse()

        this.loading = false
        // Set loading to false after data is fetched
        this.posts = posts
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }
}
</script>