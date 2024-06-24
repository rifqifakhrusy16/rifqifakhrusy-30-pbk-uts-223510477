<template>
  <div v-if="album" class="album-detail">
    <h1>{{ album.title }}</h1>
    <ul class="photo-list">
      <li v-for="photo in photos" :key="photo.id" class="photo-item">
        <img :src="photo.thumbnailUrl" :alt="photo.title" @click="showPhoto(photo)">
      </li>
    </ul>
  </div>
  <div v-else class="loading-message">
    <p>Loading...</p>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default defineComponent({
  props: {
    albumId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const album = ref(null);
    const photos = ref([]);
    const router = useRouter();

    const fetchAlbum = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${props.albumId}`);
        album.value = response.data;
      } catch (error) {
        console.error('Error fetching album:', error);
      }
    };

    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${props.albumId}/photos`);
        photos.value = response.data;
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    const showPhoto = (photo) => {
      console.log('Clicked photo:', photo);
      // Add functionality to show full-size photo if needed
    };

    onMounted(() => {
      fetchAlbum();
      fetchPhotos();
    });

    return {
      album,
      photos,
      showPhoto,
    };
  },
});
</script>

<style scoped>
.album-detail {
  padding: 20px;
}

.photo-list {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

.photo-item {
  cursor: pointer;
}

.photo-item img {
  width: 100%;
  height: auto;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.photo-item img:hover {
  opacity: 0.8;
}

.loading-message {
  padding: 20px;
  text-align: center;
}
</style>
