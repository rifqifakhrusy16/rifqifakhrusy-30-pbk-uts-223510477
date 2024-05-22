<template>
  <div class="app">
    <header>
      <nav>
        <ul>
          <li @click="view = 'todos'" :class="{ active: view === 'todos' }">Todos</li>
          <li @click="view = 'posts'" :class="{ active: view === 'posts' }">Posts</li>
        </ul>
      </nav>
    </header>
    <Todos v-if="view === 'todos'" :tasks="tasks" :newTask="newTask" :showOnlyIncomplete="showOnlyIncomplete" @add-task="addTask" @remove-task="removeTask" @update-new-task="updateNewTask" @toggle-incomplete="toggleIncomplete" />
    <Posts v-if="view === 'posts'" :users="users" :posts="posts" :selectedUserId="selectedUserId" :selectedPost="selectedPost" @fetch-posts-by-user="fetchPostsByUser" @select-post="selectPost" @deselect-post="deselectPost" />
  </div>
</template>

<script>
import Todos from './components/Todos.vue';
import Posts from './components/Posts.vue';

export default {
  components: {
    Todos,
    Posts
  },
  data() {
    return {
      newTask: '',
      tasks: [],
      showOnlyIncomplete: false,
      view: 'todos', // Initial view set to 'todos'
      posts: [],
      selectedPost: null, // To store the selected post
      users: [],
      selectedUserId: null // To store the selected user's ID
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push({ title: this.newTask.trim(), completed: false });
        this.newTask = '';
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
    updateNewTask(newTask) {
      this.newTask = newTask;
    },
    toggleIncomplete(showOnlyIncomplete) {
      this.showOnlyIncomplete = showOnlyIncomplete;
    },
    async fetchPosts() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        this.posts = data;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchPostsByUser(userId) {
      if (userId) {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
          const data = await response.json();
          this.posts = data;
          this.selectedPost = null;
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      } else {
        this.posts = [];
      }
    },
    selectPost(post) {
      this.selectedPost = post;
    },
    deselectPost() {
      this.selectedPost = null;
    }
  },
  watch: {
    view(newView) {
      if (newView === 'posts') {
        if (this.users.length === 0) {
          this.fetchUsers();
        }
      }
    }
  },
  computed: {
    filteredTasks() {
      if (this.showOnlyIncomplete) {
        return this.tasks.filter(task => !task.completed);
      } else {
        return this.tasks;
      }
    }
  }
};
</script>

<style scoped>
/* Your existing styles */
</style>
