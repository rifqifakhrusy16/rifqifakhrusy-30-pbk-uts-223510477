// stores/store.js
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    // Define your state here
    albums: []
  }),
  actions: {
    // Define your actions here
    async fetchAlbums() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums')
        const data = await response.json()
        this.albums = data
      } catch (error) {
        console.error('Error fetching albums:', error)
      }
    }
  }
})
