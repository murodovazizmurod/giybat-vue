<script setup>
import PageLoading from '../components/PageLoading.vue';
import PostReactions from '../components/PostReactions.vue'
</script>

<template>
    <div>
        <PageLoading v-if="loading" />
        <div class="back">
            <RouterLink :to="{ name: 'home' }" active-class="active">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACIElEQVR4nO3Zz4tNYRjA8ReLW35MTSiJFREbUaNsFJFILFhY2VA2fhTJgqJQk5WNhY2FjWRDMrGZnR+lJCWR2BnKQgZh8NGZc25utzvjnnvvuXPeut8/4Dnn2/u87/M+zxtCjx7xgEUhdrARIyFWMANn8BtCjGA+7qkhxAbW412tRFQimIYj+FkvEY0I5mKokUA0IhjA28kkSi3iXyr9+J9EaUXQhxvNCJRWBGvwOo9E6URwEN+1xpfsWH6BYVzGcWzC7G6m0nXFMYbHOImlRUmswkvd5T52YXqnJPbjm6njFXa0IzALV5WHodytAJbjmfLxEdvziKzEc+XkD47GnFr1nMubZnvxVTk50crxm5weZUyz3Xll5uCa8jGKZblkOnBFKYoHLRXOrP9408IHZ2IhVmAddiZ5jit41OZePJBbJJPpx608X2oiZgUbcB5PWqgxfe00Vscm6tHzijSIvxqX8KlJmdMtiXSr1ZWu/mATd75kVSrtyszD3SJEqmBx/aysAXtCuyQnB07hVxEiNel8eJI5wXDoFNmGHSlCpAo24/MERXJJ6BRYkLWzhYgkYG1WEOs5FAoYYp8tcoiNrVmbXMvtIp8V3hcSPIzHT/Zl/ZCjEt1Dj3TlH9bJDIQYkRbP8RTO2BdiBTdrRC6GWMGWGpE7IVakxbLaAD4NMYMLmciHEDPYlomMhpiRXl4TxkLsSK/9/VP9Hz169Ajd4S9NrFjqtn2SUAAAAABJRU5ErkJggg=="
                    style="width: 25px;" alt="Go back">
            </RouterLink>
        </div>
        <article v-if="post">
            <p class="meta"><span v-html="post.created_date_long"></span></p>
            <h1 class="title" v-html="post.title"></h1>
            <span v-html="post.text"></span>
            <PostReactions :post="post" />
        </article>
    </div>
</template>


<script>
export default {
    data() {
        return {
            loading: false,
            post: null,
            error: null
        }
    },
    created() {
        // watch the params of the route to fetch the data again
        this.$watch(
            () => this.$route.params,
            () => {
                this.getPost()
            },
            { immediate: true }
        )
    },
    methods: {
        async getPost() {
            this.loading = true // Set loading to true when starting data fetching

            try {
                var response = await fetch('https://4a73734eb4.pythonanywhere.com/api/post/' + this.$route.params.id)
                var post = await response.json()

                this.loading = false
                // Set loading to false after data is fetched
                this.post = post
            } catch (error) {
                location.reload()
            }
        }
    }
}
</script>


<style>
div.back {
    max-width: 42rem;
    margin: 5rem auto 1rem auto;
}

div.back>a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    font-size: 30pt;
    border: 1px solid rgb(80, 80, 80);
    border-radius: 50%;
}

div.back>a:hover {
    text-decoration: none;
}

article {
    padding: 15px;
    margin: 0 auto;
    max-width: 45rem;
    border: 1px solid rgb(80, 80, 80);
    border-radius: 5px;
    margin-bottom: 5rem;
}

a>img:hover {
    cursor: pointer;
}


img {
    display: block;
    /* Ensure the images are treated as block elements */
    max-width: 100%;
    /* Ensure images never exceed the width of the article */
    max-height: 100%;
    /* Ensure images never exceed the height of the article */
    object-fit: contain;
    /* Scale the image to fit inside the container without distorting it */
    margin: 0 auto;
}

h1.title {
    font-family: 'Title', sans-serif;
    margin-bottom: 3rem;
    font-size: 40pt;
}

@media (width <=965px) {
    article {
        border: none;
        font-size: 1.1rem;
    }

    h1.title {
        font-size: 35pt;
        margin-bottom: 2rem;
    }

    div.back {
        margin-left: 10px;
        margin-top: 3rem;
    }
}

@media (width <=620px) {
    article {
        margin: 10px;
        border: none;
        font-size: 1.1rem;
    }

    div.back {
        margin-left: 10px;
        margin-top: 1rem;

    }

    h1.title {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    p.meta>span {
        font-size: .7rem;
    }
}
</style>