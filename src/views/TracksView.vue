<script setup>
import axios from "axios";
import { ref } from "vue";

const apiUrl = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/tracks';
const tracksApi = ref([]);

const loadTracks = async () => {
  const response = await axios.get(apiUrl);
  tracksApi.value = response.data.data;
  console.log(tracksApi);
};

loadTracks();
</script>

<template>
  <div id="root">
    <div class="left-scene">
      <div class="selected-track">
        <!-- TODO code component <SelectedTrack /> -->
      </div>
    </div>
    <div className="right-scene">
      <!-- TODO code component <TrackList /> -->
    </div>
  </div>
</template>

<style>
#root {
  display: flex;
  height: 100vh;
}

.left-scene {
  flex: 0 0 60%;
  position: sticky;
  display: flex;
  flex-direction: column;
}

.selected-track {
  text-align: center;
  display: flex;
  flex-grow: 1;
  height: calc(100vh - 232px);
  background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.22'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.right-scene {
  flex: 0 0 40%;
  background-color: #ecf0f1;
  overflow: scroll;
}
.track-list {
  column-count: 1;
  column-gap: 5px;
  padding: 5px;
}

.track {
  width: 100%;
  margin: 5px;
  cursor: pointer;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
