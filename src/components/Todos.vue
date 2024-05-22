<template>
    <div class="todo-list">
      <h1>Daftar Mobil</h1>
      <input :value="newTask" @input="$emit('update-new-task', $event.target.value)" @keyup.enter="$emit('add-task')" placeholder="Masukkan nama mobil">
      <ul>
        <li v-for="(task, index) in filteredTasks" :key="index">
          <div class="task-item">
            <input type="checkbox" v-model="task.completed" class="checkbox-left">
            <span :class="{ 'completed': task.completed }" class="task-title">
              {{ task.title }}
            </span>
            <button @click="$emit('remove-task', index)" class="delete-button">Hapus</button>
          </div>
        </li>
      </ul>
      <div>
        <label>
          <input type="checkbox" :checked="showOnlyIncomplete" @change="$emit('toggle-incomplete', $event.target.checked)">
          Tampilkan mobil yang masih ada
        </label>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      tasks: Array,
      newTask: String,
      showOnlyIncomplete: Boolean
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
  /* Your existing styles for todos */
  </style>
  