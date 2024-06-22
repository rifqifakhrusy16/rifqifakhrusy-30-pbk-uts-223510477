<template>
  <div class="app">
    <header>
      <nav>
        <ul>
          <li @click="view = 'todos'" :class="{ active: view === 'todos' }">Todos</li>
          <li @click="view = 'posts'" :class="{ active: view === 'posts' }">Posts</li>
          <li @click="view = 'albums'" :class="{ active: view === 'albums' }">Albums</li>
        </ul>
      </nav>
    </header>
    <Todos v-if="view === 'todos'" :tasks="tasks" :newTask="newTask" :showOnlyIncomplete="showOnlyIncomplete" @add-task="addTask" @remove-task="removeTask" @update-new-task="updateNewTask" @toggle-incomplete="toggleIncomplete" @edit-task="editTask" />
    <Posts v-if="view === 'posts'" :users="users" :posts="posts" :selectedUserId="selectedUserId" :selectedPost="selectedPost" @fetch-posts-by-user="fetchPostsByUser" @select-post="selectPost" @deselect-post="deselectPost" />
    <Albums v-if="view === 'albums'" />
  </div>
</template>

<script>
import { ref } from 'vue'
import Todos from './components/Todos.vue'
import Posts from './components/Posts.vue'
import Albums from './components/Albums.vue'

export default {
  components: {
    Todos,
    Posts,
    Albums,
  },
  setup() {
    const view = ref('todos')  // default view
    
    const tasks = ref([])
    const newTask = ref('')
    const showOnlyIncomplete = ref(false)
    const users = ref([])
    const posts = ref([])
    const selectedUserId = ref(null)
    const selectedPost = ref(null)

    const addTask = (task) => {
      tasks.value.push(task)
    }

    const removeTask = (index) => {
      tasks.value.splice(index, 1)
    }

    const updateNewTask = (task) => {
      newTask.value = task
    }

    const toggleIncomplete = () => {
      showOnlyIncomplete.value = !showOnlyIncomplete.value
    }

    const fetchPostsByUser = async (userId) => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        posts.value = await response.json()
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    const selectPost = (post) => {
      selectedPost.value = post
    }

    const deselectPost = () => {
      selectedPost.value = null
    }

    const editTask = (task) => {
      const index = tasks.value.findIndex(t => t === task)
      if (index !== -1) {
        tasks.value.splice(index, 1, task)
      }
    }

    return {
      view,
      tasks,
      newTask,
      showOnlyIncomplete,
      users,
      posts,
      selectedUserId,
      selectedPost,
      addTask,
      removeTask,
      updateNewTask,
      toggleIncomplete,
      fetchPostsByUser,
      selectPost,
      deselectPost,
      editTask
    }
  },
}
</script>

<style scoped>
/* Your existing styles */
</style>
