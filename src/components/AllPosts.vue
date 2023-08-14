<template>
    <div class="article tab-content" v-for="post in posts" :key="post.id">
        <div class="time">{{ post.created_date }}</div>
        <div class="info">
            <h1>
                <RouterLink :to="{ name: 'post', params:{id: post.id}}">{{post.title}}</RouterLink>
            </h1>
            <p>{{ post.desc }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['posts']
}
</script>