<template>
    <div class="posts">
      <h1>Postingan</h1>
      <select :value="selectedUserId" @change="$emit('fetch-posts-by-user', $event.target.value)">
        <option value="" disabled>Pilih pengguna</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <ul v-if="posts.length && !selectedPost">
        <li v-for="post in posts" :key="post.id" @click="$emit('select-post', post)">
          <h2>{{ post.title }}</h2>
          <p>{{ post.body }}</p>
        </li>
      </ul>
      <div v-else-if="!selectedPost" class="no-posts">
        <p>Silakan pilih pengguna untuk melihat postingan.</p>
      </div>
      <div v-else class="post-details">
        <button @click="$emit('deselect-post')" class="back-button">Kembali</button>
        <h2>{{ selectedPost.title }}</h2>
        <p>{{ selectedPost.body }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      users: Array,
      posts: Array,
      selectedUserId: [String, Number],
      selectedPost: Object
    }
  };
  </script>
  
  <style scoped>
  /* Your existing styles for posts */
  </style>
  