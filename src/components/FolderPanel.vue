<script setup>
import { computed } from 'vue';

const props = defineProps(['path', 'folders']);

const folders = computed(() => {
  const newFolders = [];

  for (const item of props.folders) {
    var itemPath = props.path + item;

    newFolders.push({
      item: item,
      path: itemPath,
    });
  }

  return newFolders;
});
</script>

<template>
  <div class="panel">
    <span>Subfolders:</span>
    <li v-for="folder in folders">
      <router-link :to="folder.path">{{ folder.item }} </router-link>
    </li>
    <div v-if="folders.length == 0" class="folder-placeholder">(None)</div>
  </div>
</template>

<style>
.panel {
  margin: 10px;
  padding: 5px;
  text-align: left;
}

li {
  list-style: none;
  margin-left: 15px;
}

.folder-placeholder {
  font-style: italic;
  margin-left: 10px;
  color: #ccc;
}

</style>
