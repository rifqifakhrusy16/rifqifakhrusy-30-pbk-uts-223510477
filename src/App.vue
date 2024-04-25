<template>
  <div class="todo-list">
    <h1>Daftar Mobil</h1>
    <input v-model="newTask" @keyup.enter="addTask" placeholder="Masukkan nama mobil">
    <ul>
      <li v-for="(task, index) in filteredTasks" :key="index">
        <div class="task-item">
          <input type="checkbox" v-model="task.completed" class="checkbox-left">
          <span :class="{ 'completed': task.completed }" class="task-title">
            {{ task.title }}
          </span>
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
  data() {
    return {
      newTask: '',
      tasks: [],
      showOnlyIncomplete: false
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push({ title: this.newTask.trim(), completed: false });
        this.newTask = '';
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    }
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

.todo-list {
  border :2px solid aqua;
  background-color: rgba(225, 225, 225. 0.4);
  box-shadow: 10px 10px 20px rgb(5, 148, 52);
  margin:auto;
  width: 500px;
  padding: 25px;
  border-radius: 10px;
  border-color:rgb(8, 129, 44);
  color : rgb(255, 255, 255);
}

ul {
  list-style-type: none;
  padding: 010PX;
}

.completed {
  text-decoration: line-through;
}

.delete-button {
  background-color: red;
  color: white;
  border: none;
  padding: 10px 10px;
  cursor: pointer;
  border-radius: 4px;
}
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.checkbox-left {
  margin-right: 10px;
}

.task-title {
  flex-grow: 1; /* Mengisi ruang yang tersisa */
}

</style>
