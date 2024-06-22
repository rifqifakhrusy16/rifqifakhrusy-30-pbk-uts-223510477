import { defineStore } from 'pinia';
import axios from 'axios';

export const useAlbumStore = defineStore('albumStore', {
  state: () => ({
    albums: [],
    selectedAlbum: null,
  }),
  actions: {
    async fetchAlbums() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
        this.albums = response.data;
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      }
    },
    selectAlbum(album) {
      this.selectedAlbum = album;
    },
    deselectAlbum() {
      this.selectedAlbum = null;
    }
  }
});
