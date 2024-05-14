<template>
  <div class="app">
    <header>
      <nav>
        <ul>
          <li @click="view = 'todos'" :class="{ active: view === 'todos' }">Todos</li>
          <li @click="view = 'posts'" :class="{ active: view === 'posts' }">Post</li>
        </ul>
      </nav>
    </header>
    <div v-if="view === 'todos'" class="todo-list">
      <h1>Daftar Mobil</h1>
      <input v-model="newTask" @keyup.enter="addTask" placeholder="Masukkan nama mobil">
      <ul>
        <li v-for="(task, index) in filteredTasks" :key="index">
          <div class="task-item">
            <input type="checkbox" v-model="task.completed" class="checkbox-left">
            <span :class="{ 'completed': task.completed }" class="task-title">
              {{ task.title }}
            </span>
            <button @click="removeTask(index)" class="delete-button">Hapus</button>
          </div>
        </li>
      </ul>
      <div>
        <label>
          <input type="checkbox" v-model="showOnlyIncomplete">
          Tampilkan mobil yang masih ada
        </label>
      </div>
    </div>
    <div v-if="view === 'posts'" class="posts">
      <h1>Postingan</h1>
      <select v-model="selectedUserId" @change="fetchPostsByUser">
        <option value="" disabled>Pilih pengguna</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <ul v-if="posts.length && !selectedPost">
        <li v-for="post in posts" :key="post.id" @click="selectPost(post)">
          <h2>{{ post.title }}</h2>
          <p>{{ post.body }}</p>
        </li>
      </ul>
      <div v-else-if="!selectedPost" class="no-posts">
        <p>Silakan pilih pengguna untuk melihat postingan.</p>
      </div>
      <div v-else class="post-details">
        <button @click="deselectPost" class="back-button">Kembali</button>
        <h2>{{ selectedPost.title }}</h2>
        <p>{{ selectedPost.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    async fetchPostsByUser() {
      if (this.selectedUserId) {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUserId}`);
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
  computed: {
    filteredTasks() {
      if (this.showOnlyIncomplete) {
        return this.tasks.filter(task => !task.completed);
      } else {
        return this.tasks;
      }
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
  }
};
</script>

<style scoped>
.app {
  width: 500px;
  margin: auto;
}

header {
  background-color: #008522;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}

nav ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
  margin: 0;
}

nav li {
  cursor: pointer;
  padding: 10px;
  color: white;
}

nav li.active {
  background-color: #005713;
  border-radius: 5px;
}

.todo-list {
  border: 2px solid aqua;
  background-color: rgba(225, 225, 225, 0.4);
  box-shadow: 10px 10px 20px rgb(5, 148, 52);
  margin: auto;
  padding: 25px;
  border-radius: 0 0 10px 10px;
  border-color: rgb(8, 129, 44);
  color: rgb(255, 255, 255);
}

ul {
  list-style-type: none;
  padding: 10px;
}

.completed {
  text-decoration: line-through;
}

.delete-button {
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.checkbox-left {
  margin-right: 10px;
}

.task-title {
  flex-grow: 1; /* Mengisi ruang yang tersisa */
}

.posts {
  border: 2px solid aqua;
  background-color: rgba(225, 225, 225, 0.4);
  box-shadow: 10px 10px 20px rgb(5, 148, 52);
  margin: auto;
  padding: 25px;
  border-radius: 0 0 10px 10px;
  border-color: rgb(8, 129, 44);
  color: rgb(255, 255, 255);
}

.posts ul {
  list-style-type: none;
  padding: 10px;
}

.posts li {
  cursor: pointer;
  margin-bottom: 10px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.posts li:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.post-details {
  text-align: left;
}

.no-posts {
  text-align: center;
  padding: 20px;
  font-style: italic;
}

.back-button {
  background-color: #005713;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 10px;
}
</style>
