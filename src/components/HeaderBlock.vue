<script setup>
import { RouterLink } from 'vue-router'
</script>


<template>
    <header>
        <h1>
            <RouterLink to="/">G'iybat</RouterLink>
        </h1>
    </header>
</template>


<style>
header {
    width: 100%;
    text-align: center;
    padding: 15px 0;
    position: sticky;
    margin: 2rem 0 1rem 0;
    background-color: #33333366;
    background: url('../assets/THTwoyY.png') repeat center center;
    top: 0;
    z-index: 999;
    backdrop-filter: saturate(180%) blur(20px);
    transition: background-color 0.1 ease-in-out;
}

header>h1>a {
    font-family: Title, sans-serif;
    font-size: 30pt;
}

header>h1>a:hover {
    text-decoration: none;
}
</style>