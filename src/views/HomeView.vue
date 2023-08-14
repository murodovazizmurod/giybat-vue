<script setup>
import PageLoading from '../components/PageLoading.vue'
import AllPosts from '../components/AllPosts.vue';
</script>

<template>
  <div class="page" id="postsContainer">
    <PageLoading v-if="loading" />
    <AllPosts :posts="posts" />
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
        var tposts = await response.json()
        this.posts = tposts.reverse()

        this.loading = false
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }
}
</script>