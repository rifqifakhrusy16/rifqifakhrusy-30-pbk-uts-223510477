<template>
  <div class="albums">
    <h1>Album Foto</h1>
    <ul class="album-list">
      <li v-for="album in albums" :key="album.id" @click="selectAlbum(album)" class="album-item">
        <h2>{{ album.title }}</h2>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const albums = ref([]);
    const router = useRouter();

    // Fetch albums from JSONPlaceholder API
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
        albums.value = response.data;
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    // Function to navigate to album detail page
    const selectAlbum = (album) => {
      router.push(`/albums/${album.id}`);
    };

    // Fetch albums on component mounted
    fetchAlbums();

    return {
      albums,
      selectAlbum,
    };
  },
});
</script>

<style scoped>
.albums {
  padding: 20px;
}

.album-list {
  list-style-type: none;
  padding: 0;
}

.album-item {
  cursor: pointer;
  padding: 10px;
  margin-bottom: 5px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.album-item:hover {
  background-color: #e9e9e9;
}

.album-item h2 {
  margin: 0;
  font-size: 1.2em;
  text-align: center;
}
</style>
