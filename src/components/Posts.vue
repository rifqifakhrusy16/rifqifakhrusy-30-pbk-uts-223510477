<template>
  <div class="posts">
    <h1>Postingan</h1>
    <select :value="selectedUserId" @change="fetchPostsByUser($event.target.value)">
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
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

export default defineComponent({
  setup() {
    const users = ref([]);
    const posts = ref([]);
    const selectedPost = ref(null);
    const selectedUserId = ref('');

    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        users.value = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchPostsByUser = async (userId) => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: { userId }
        });
        posts.value = response.data;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const selectPost = (post) => {
      selectedPost.value = post;
    };

    const deselectPost = () => {
      selectedPost.value = null;
    };

    onMounted(() => {
      fetchUsers();
    });

    return {
      users,
      posts,
      selectedPost,
      selectedUserId,
      fetchPostsByUser,
      selectPost,
      deselectPost
    };
  }
});
</script>

<style scoped>
/* Add your styles here */
</style>
