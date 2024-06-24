<template>
  <div>
    <nav>
      <ul>
        <li><router-link to="/albums">Albums</router-link></li>
        <li><router-link to="/posts">Posts</router-link></li>
        <li><router-link to="/todos">Todos</router-link></li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
nav {
  background-color: #f8f8f8;
  padding: 10px;
}

nav ul {
  list-style-type: none;
  display: flex;
  justify-content: space-around;
  padding: 0;
  margin: 0;
}

nav ul li {
  margin: 0 10px;
}

nav ul li a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

nav ul li a.router-link-active {
  color: #42b983;
}
</style>
