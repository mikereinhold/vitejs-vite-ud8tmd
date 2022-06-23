<script setup>
import { computed, reactive } from 'vue';
import { useCookies } from 'vue3-cookies';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import Breadcrumb from '../components/Breadcrumb.vue';
import FolderPanel from '../components/FolderPanel.vue';
import VideoPanel from '../components/VideoPanel.vue';
import settings from '../assets/settings.json';

const props = defineProps(['path', 'videoId']);

console.log("VideoID: ", props.videoId)

const path = computed(() => {
  var result = props.path;
  
  if (typeof result == "string") {
    result = decodeURI(result).split('/');
  }
  if (Array.isArray(result)) {
    result = result.filter(n => n).join('/');
    result = result + "/"
  } 
  load_path(result);
  return result;
});

const { cookies } = useCookies()
const authHeaders = computed(() => {
  var userId = cookies.get(settings.lastAuthUserCookie)
  var accessToken = cookies.get(settings.accessTokenPrefix + userId + settings.accessTokenPostfix)

  return {
    Authorization: `Bearer ${accessToken}`
  }
})

const state = reactive({
  last: '',
  files: [],
  folders: [],
  more: false,
  ready: false,
  loadingMore: false,
});

function load_path(new_path, startAfter = '', maxVideos = settings.defaultPageSize) {
  fetch(
    settings.browseUrl + '?' + 
      new URLSearchParams({
        path: new_path,
        startAfter: startAfter,
        maxResults: maxVideos
      }),
    {
      method: 'get',
      headers: authHeaders.value
    }
  )
    .then((response) => response.json())
    .then((json) => {
      var lastFile = "";
      json.files.forEach((item) => {
        state.files.push(item);
        lastFile = item.file;
      });

      var lastFolder = "";
      json.folders.forEach((item) => {
        state.folders.push(item);
        lastFolder = item.file;
      });

      if(lastFile > lastFolder) {
        state.last = lastFile;
      } else {
        state.last = lastFolder;
      }

      state.more = json.more;
      state.ready = true;
      state.loadingMore = false;
    })
    .catch((err) => {
      alert('Error: ' + err);
    });
}
</script>

<template>
  <div id="main">
    <div id="breadcrumb">
      <Breadcrumb :path="path" />
    </div>
    <div v-if="!state.ready" id="spinner">
      <pulse-loader></pulse-loader>
    </div>
    <div v-if="state.ready" id="content">
      <div id="folderPanel">
        <!-- Folder list -->
        <FolderPanel :path="path" :folders="state.folders" />
      </div>

      <div id="videoPanel">
        <!-- Video list -->
        <VideoPanel :path="path" :files="state.files" :videoId="props.videoId" :apiEndpoint="settings.watchUrl" :authHeaders="authHeaders" :more="state.more" :loadingMore="state.loadingMore" @load-more="state.loadingMore=true; load_path(path, startAfter=state.last)"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
#content {
  display:flex;
}

#breadcrumb {
  padding: 10px;
  background-color: #ddd;
  box-shadow: 0px 1px;
}

#spinner {
  margin-top: 30px;
  padding-right: 20px;
}

#folderPanel {
  width:15vw;
  background-color: transparent;
}

#videoPanel {
  width: 100%;
}

</style>
