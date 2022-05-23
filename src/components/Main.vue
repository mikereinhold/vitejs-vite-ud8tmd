<script setup>
import { ref, reactive } from 'vue';

defineProps({
  bucket: String,
});

const path = ref('');
const items = reactive({
  files: [],
  folders: [],
});

const browseUrl =
  'https://6jy005gdrj.execute-api.us-east-1.amazonaws.com/Browse?';

function load_path() {
  fetch(
    browseUrl +
      new URLSearchParams({
        path: '/',
        startAfter: '',
      }),
    {
      method: 'get',
    }
  )
    .then((json) => {
      console.log(json);
      items.files.push(json.files);
      items.folders.push(json.folders);
    })
    .catch((err) => {
      alert('Error: ' + err);
    });
}
load_path();
</script>

<template>
  <h1>Video on Demand Streaming Browser</h1>

  <p>Browsing videos from {{ bucket }}</p>

  <p>{{ items }}</p>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
