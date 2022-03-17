import { ref } from 'vue'

const getPost = (id) => {
  const post = ref(null)
  const error = ref(null)
  const uri = `http://localhost:3000/posts/${id}`

  const fetchSingleData = async () => {
    try {
      const data = await fetch(uri)

      if (!data.ok) {
        throw Error('post does not exist')
      }

      post.value = await data.json()
    } catch (err) {
      error.value = err.message
    }
  }

  return {
    post,
    error,
    fetchSingleData,
  }
}

export default getPost
