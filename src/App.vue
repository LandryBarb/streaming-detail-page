<template>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  
  <MovieDetail />
</template>

<script setup lang="ts">
import MovieDetail from './components/MovieDetail.vue';
</script>

<style>
/* Global resets */
body {
  margin: 0;
  background-color: #141414;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #e50914;
  color: white;
  padding: 8px;
  z-index: 100;
  transition: top 0.2s;
  text-decoration: none;
  font-weight: bold;
}

.skip-link:focus {
  top: 0;
  outline: 3px solid white;
}
</style>