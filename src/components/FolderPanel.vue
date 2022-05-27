<script setup>
import { computed } from 'vue';

const props = defineProps(['path', 'folders']);

const folders = computed(() => {
  const newFolders = [];

  for (const itemPath of props.folders) {
    var fullPath = "/" + itemPath;
    var pathParts = fullPath.split('/').filter(n => n)
    var item = pathParts[pathParts.length - 1]

    newFolders.push({
      item: item,
      path: fullPath,
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
