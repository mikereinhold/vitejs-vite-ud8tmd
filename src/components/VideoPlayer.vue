<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue';

const props = defineProps(['src']);
const videoPlayer = ref();

const videoOptions = computed(() => {
  return {
    autoplay: true,
    controls: true,
    sources: [
      {
        src: props.src,
        type: 'application/x-mpegURL',
      },
    ],
    responsive: true,
    fluid: true,
    breakpoints: {
      tiny: 0,
      xsmall: 320,
      small: 425,
      medium: 500,
      large: 1000,
      xlarge: 2000,
    },
  };
});

var player = null;

onMounted(() => {
  player = videojs(videoPlayer.value, videoOptions.value, () => {
    player.log('onPlayerReady', this);
  });
});

onUnmounted(() => {
  if (player) {
    player.dispose();
  }
});
</script>

<template>
  <div class="player">
    <video-js ref="videoPlayer" class="vjs-fluid" controls></video-js>
  </div>
</template>

<style>
.player {
  margin: 20px;
  padding: 20px;
  display: flex;
  justify-content: center;
}

li {
  list-style: none;
  margin-left: 15px;
}
</style>
