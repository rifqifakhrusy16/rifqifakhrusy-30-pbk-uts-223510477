<!-- Photos.vue -->
<template>
    <div class="photos">
      <button @click="$emit('deselect-album')" class="back-button">Kembali</button>
      <h2>Foto dalam {{ album.title }}</h2>
      <ul>
        <li v-for="photo in photos" :key="photo.id" @click="selectPhoto(photo)">
          <img :src="photo.thumbnailUrl" alt="Thumbnail" />
        </li>
      </ul>
      <div v-if="selectedPhoto" class="photo-modal">
        <button @click="closePhoto" class="close-button">Tutup</button>
        <img :src="selectedPhoto.url" alt="Full size" />
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, watch } from 'vue';
  
  export default defineComponent({
    props: {
      album: Object,
    },
    setup(props) {
      const photos = ref([]);
      const selectedPhoto = ref(null);
  
      const fetchPhotos = async (albumId) => {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
          const data = await response.json();
          photos.value = data;
        } catch (error) {
          console.error('Error fetching photos:', error);
        }
      };
  
      const selectPhoto = (photo) => {
        selectedPhoto.value = photo;
      };
  
      const closePhoto = () => {
        selectedPhoto.value = null;
      };
  
      watch(() => props.album.id, (newAlbumId) => {
        fetchPhotos(newAlbumId);
      });
  
      return {
        photos,
        selectedPhoto,
        selectPhoto,
        closePhoto,
      };
    },
  });
  </script>
  
  <style scoped>
  .photos ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
  }
  
  .photos li {
    margin: 10px;
    cursor: pointer;
  }
  
  .photos img {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
  
  .photo-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .photo-modal img {
    max-width: 90%;
    max-height: 90%;
  }
  
  .back-button,
  .close-button {
    margin: 10px;
    padding: 5px 10px;
    background: #fff;
    border: none;
    cursor: pointer;
  }
  </style>
  