<script setup>
import { computed } from 'vue';
const props = defineProps(['path']);

var breadcrumb = computed(() => {
  const pathParts = props.path.split('/').filter((n) => n);
  const result = [];

  pathParts.forEach(function (item, index) {
    if(index < pathParts.length - 1){
      var path = "/" + pathParts.slice(0, index-1).join('/');

      result.push({
        item: item,
        path: path,
      });
    }
  });
  return result;
});

var current = computed(() => {
  const pathParts = props.path.split('/').filter((n) => n);
  return pathParts[pathParts.length - 1];
})
</script>

<template>
  <div class="nav">
    <router-link to="/">Home</router-link>&nbsp;/&nbsp;
    <span v-for="part in breadcrumb">
      <router-link :to="part.path"> {{ part.item }} </router-link> /&nbsp;</span> <span class="current"> {{ current }} </span>
  </div>
</template>

<style>

.nav {
  display: flex;
}

a {
  color:#333;
}
a:active,a:hover {
  color:#f8991d;
}

.current {
  font-weight: bold;
}

</style>
