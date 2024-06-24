<template>
  <div class="todo-list">
    <h1>Daftar Mobil</h1>
    <div>
      <input v-model="newTask" @keyup.enter="addTask" placeholder="Masukkan nama mobil">
      <button @click="addTask">Tambah Mobil</button>
    </div>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        <div class="task-item">
          <input type="checkbox" v-model="task.completed" class="checkbox-left">
          <span v-if="!task.editing" :class="{ 'completed': task.completed }" class="task-title">{{ task.title }}</span>
          <input v-else v-model="task.title" @keyup.enter="saveTask(task)">
          <button @click="editTask(task)">{{ task.editing ? 'Simpan' : 'Edit' }}</button>
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
</template>

<script>
export default {
  props: {
    initialTasks: Array, // Ensure initialTasks array is provided as a prop
  },
  data() {
    return {
      newTask: '', // Initialize newTask in data
      showOnlyIncomplete: false,
      tasks: [], // Initialize tasks array in data
    };
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
  mounted() {
    if (Array.isArray(this.initialTasks)) {
      this.tasks = [...this.initialTasks]; // Copy initialTasks to tasks array if it's an array
    } else {
      console.warn('Initial tasks are not provided or not an array.');
    }
  },
  methods: {
    addTask() {
      if (this.newTask.trim() === '') return; // Ensure newTask is defined before using trim()
      this.tasks.push({ title: this.newTask, completed: false, editing: false }); // Add new task to tasks array
      this.newTask = ''; // Clear newTask after adding
    },
    editTask(task) {
      task.editing = !task.editing;
      if (!task.editing) {
        this.$emit('edit-task', task);
      }
    },
    saveTask(task) {
      task.editing = false;
      this.$emit('edit-task', task);
    },
    removeTask(index) {
      this.tasks.splice(index, 1); // Remove task from tasks array
    }
  }
}
</script>

<style scoped>
/* Your existing styles for todos */
</style>
