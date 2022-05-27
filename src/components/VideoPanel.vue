<script setup>
import { computed, reactive } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import VideoPlayer from './VideoPlayer.vue';
import router from '../router';

const props = defineProps({
  files: Array,
  path: String,
  videoId: String,
  apiEndpoint: {
    type: String,
    required: true
  },
  more: Boolean,
  loadingMore: Boolean,
});
const state = reactive({
  show: false,
  videoSrc: '',
});

console.log("Path: ", props.path);
console.log("VideoId: ", props.videoId)

function videoClick(video) {
  var path = props.path;
  if(path != "/"){
    path = "/" + props.path
  }
  router.push({ path: path, query: { id: video.id } });
  loadVideo(video.id)
}

function loadVideo(id) {
  state.show = false;
  state.videoSrc = ""

fetch(
    props.apiEndpoint + '?' +
      new URLSearchParams({
        id: id,
      }),
    {
      method: 'get',
    }
  )
    .then((response) => response.json())
    .then((json) => {
      state.videoSrc = json.url;
      state.show = true;
    })
    .catch((err) => {
      alert('Error: ' + err);
    });
}

console.log("Loading video for: ", props.videoId)
if(props.videoId) {
  loadVideo(props.videoId)
}
</script>

<template>
  <div class="main">
    <div v-for="video in props.files">
      <a class="button" @click="videoClick(video)">
        {{ video.file.replace(props.path, '') }}
      </a>
    </div>
    <a v-if="props.more && !props.loadingMore" class="load-more" @click="$emit('loadMore')">Load more...</a>
    <div v-if="props.loadingMore" class="loading-more"><pulse-loader></pulse-loader></div>
  </div>
  <div v-if="props.files.length == 0" class="video-placeholder">No videos here to show!</div>
  <div class="player-panel" v-if="state.show">
    <VideoPlayer :src="state.videoSrc" :key="props.videoId" />
  </div>
</template>

<style>
.main {
  margin: 10px;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
}

.main .button {
  margin: 5px;
  padding: 15px 32px;
  border: none;
  background-color: #f8991d;
  font-size: 16px;
  display: inline-block;
}

.main .button:hover {
  color: white;
  background-color: gray;
}

.load-more {
  margin: 0px;
  padding: 25px 32px;
  display: inline-block;
  border: none;
  background-color: transparent;
  font-style: italic;
  vertical-align: text-bottom;
}

.load-more:hover {
  color: #f8991d;
}

.player-panel {
  padding: 1vh 10vw 2vh 0vw;
}
.video-placeholder {
  font-style: italic;
  margin-right: 15vw;
  margin-top: 20px;
  color: #ccc;
}

.loading-more {
  margin: 25px;
}
</style>
