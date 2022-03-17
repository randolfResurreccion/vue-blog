import { ref } from 'vue'

const getPosts = () => {
  const posts = ref([])
  const error = ref(null)
  const uri = 'http://localhost:3000/posts'

  const fetchData = async () => {
    try {
      const data = await fetch(uri)

      if (!data.ok) {
        throw Error('no data available')
      }

      posts.value = await data.json()
    } catch (err) {
      error.value = err.message
    }
  }

  return {
    posts,
    error,
    fetchData,
  }
}

export default getPosts
