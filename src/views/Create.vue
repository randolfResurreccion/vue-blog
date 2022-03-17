<template>
  <div class="create">
    <form @submit.prevent="onSubmit">
      <label>Title:</label>
      <input v-model="title" type="text" required />
      <label>Content:</label>
      <textarea v-model="body" required></textarea>
      <label>Tags(hit enter to add a tag)</label>
      <input @keydown.enter.prevent="addTag" v-model="tag" type="text" />
      <div v-for="tag in tags" :key="tag" class="pill">#{{ tag }}</div>

      <button>Add Post</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Create',
  setup() {
    const router = useRouter()

    const title = ref('')
    const body = ref('')
    const tag = ref('')
    const tags = ref([])

    const addTag = () => {
      tag.value = tag.value.replace(/\s+/g, '')
      if (!tags.value.includes(tag.value)) {
        tags.value = [...tags.value, tag.value]
        console.log(tags.value)
      }

      tag.value = ''
    }

    const onSubmit = async () => {
      console.log('add post')

      const post = {
        title: title.value,
        body: body.value,
        tags: tags.value,
      }

      await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(post),
      })

      router.push({ name: 'home' })
    }

    return {
      title,
      body,
      tag,
      tags,
      addTag,
      onSubmit,
    }
  },
}
</script>

<style>
form {
  max-width: 480px;
  margin: 0 auto;
  text-align: left;
}

input,
textarea {
  display: block;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #bbb;
}

textarea {
  height: 160px;
}

label {
  display: inline-block;
  margin-top: 30px;
  position: relative;
  font-size: 20px;
  color: #fff;
  margin-bottom: 10px;
}

label::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background: #43b883;
  position: absolute;
  z-index: -1;
  padding-right: 40px;
  left: -30px;
  transform: rotateZ(-1.5deg);
}

button {
  display: block;
  margin-top: 30px;
  background: #43b883;
  color: #fefefe;
  width: 100%;
  padding: 10px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s ease;
}

button:active {
  transform: translateY(5px);
}

.pill {
  display: inline-block;
  margin: 10px 10px 0 0;
  background: #ddd;
  padding: 8px;
  border-radius: 20px;
  font-size: 14px;
}
</style>
