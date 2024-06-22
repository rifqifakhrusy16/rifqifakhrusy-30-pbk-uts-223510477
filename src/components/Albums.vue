<template>
  <div class="albums">
    <h1>Album Foto</h1>
    <ul class="album-list">
      <li v-for="album in albums" :key="album.id" @click="selectAlbum(album)" class="album-item">
        <h2>{{ album.title }}</h2>
      </li>
    </ul>
    <Photos v-if="selectedAlbum" :album="selectedAlbum" @deselect-album="deselectAlbum" />
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { useAlbumStore } from '../store/Albums';
import Photos from './Photos.vue';

export default defineComponent({
  components: {
    Photos
  },
  setup() {
    const store = useAlbumStore();

    onMounted(() => {
      store.fetchAlbums();
    });

    return {
      albums: store.albums,
      selectedAlbum: store.selectedAlbum,
      selectAlbum: store.selectAlbum,
      deselectAlbum: store.deselectAlbum,
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
  margin: 10px 0;
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
}
</style>
