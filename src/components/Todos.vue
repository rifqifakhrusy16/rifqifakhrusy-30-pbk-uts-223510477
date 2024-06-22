<template>
  <div class="todo-list">
    <h1>Daftar Mobil</h1>
    <div>
      <input :value="newTask" @input="$emit('update-new-task', $event.target.value)" @keyup.enter="addTask" placeholder="Masukkan nama mobil">
      <button @click="addTask">Tambah Mobil</button>
    </div>
    <ul>
      <li v-for="(task, index) in filteredTasks" :key="index">
        <div class="task-item">
          <input type="checkbox" v-model="task.completed" class="checkbox-left">
          <span v-if="!task.editing" :class="{ 'completed': task.completed }" class="task-title">{{ task.title }}</span>
          <input v-else v-model="task.title" @keyup.enter="saveTask(task)">
          <button @click="editTask(task)">{{ task.editing ? 'Simpan' : 'Edit' }}</button>
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
  },
  methods: {
    addTask() {
      if (this.newTask.trim() === '') return;
      this.$emit('add-task', { title: this.newTask, completed: false, editing: false });
      this.$emit('update-new-task', '');
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
    }
  }
}
</script>

<style scoped>
/* Your existing styles for todos */
</style>
