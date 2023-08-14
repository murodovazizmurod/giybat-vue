<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderBlock from './components/HeaderBlock.vue'
</script>

<template>
  <HeaderBlock />
  <div class="tabs">
    <RouterLink :to="{ name: 'home'}" active-class="active">Post</RouterLink>
    <RouterLink :to="{ name: 'tema'}" active-class="active">Live</RouterLink>
  </div>
    <RouterView />
</template>

<script>

</script>

<style scoped>
div.tabs {
  width: 100%;
  text-align: center;
}

div.tabs > a {
  border: none;
  border-bottom: 1px solid #5c6068;
  padding: 8px;
  background-color: transparent;
  font-size: 0.8rem;
  transition: border 1s ease;
  text-decoration: none;
}

div.tabs > a:not(:first-child) {
  margin-left: 1rem;
}

div.tabs > a.active {
  border-bottom: 3px solid #5c6068;
  transition: border 1s ease;
}

.tab-content {
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.5s,
    visibility 0.5s;
}

.tab-content.active {
  opacity: 1;
  visibility: visible;
}
</style>
