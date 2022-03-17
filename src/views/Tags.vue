<template>
  <div class="tag">
    <div v-if="error">
      {{ error }}
    </div>
    <div v-if="posts.length" class="layout">
      <PostList :posts="postsWithTag" />
      <TagCloud :posts="posts" />
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner'
import PostList from '@/components/PostList'
import TagCloud from '@/components/TagCloud'
import getPosts from '@/composables/getPosts'
import { useRoute } from 'vue-router'
import { computed } from '@vue/runtime-core'

export default {
  name: 'Tags',
  components: {
    Spinner,
    PostList,
    TagCloud,
  },
  setup() {
    const route = useRoute()

    const { posts, error, fetchData } = getPosts()

    fetchData()

    const postsWithTag = computed(() => {
      const tag = route.params.tag
      return posts.value.filter((post) => post.tags.includes(tag))
    })

    return {
      error,
      posts,
      postsWithTag,
    }
  },
}
</script>

<style>
.tag {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}
</style>
