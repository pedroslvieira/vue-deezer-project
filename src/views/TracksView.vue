<script setup>
import axios from "axios";
import { ref } from "vue";
import TrackList from "@/components/TrackList.vue";
import SelectedTrack from "@/components/SelectedTrack.vue";

const apiUrl = "https://pedroslvieira-deezer-backend.herokuapp.com/api/v1/tracks";
const tracksApi = ref([]);

// const loadTracks = async () => {
//   const response = await axios.get(apiUrl);
//   tracksApi.value = response.data.data;
// };

const loadTracks = () => {
  // const response = [];
  axios.get(apiUrl).then((response) => {
    tracksApi.value = response.data.data;
  });
};

loadTracks();

const selectedTrack = ref({});
selectedTrack.value = tracksApi.value[0];

const updateTrack = (track) => {
  selectedTrack.value = track;
  console.log(selectedTrack.value);
};
</script>

<template>
  <div id="root">
    <div class="left-scene">
      <div class="selected-track">
        <SelectedTrack :selectedTrack="selectedTrack" />
      </div>
    </div>
    <div className="right-scene">
      <TrackList :tracks="tracksApi" @track-selected="updateTrack" />
    </div>
  </div>
</template>

<style>
#root {
  display: flex;
  height: calc(100vh - 100px)
  /* height: 500px; */
}

.left-scene {
  flex: 0 0 60%;
  position: sticky;
  display: flex;
  flex-direction: column;
  border-right: solid 1px lightgray;
}

.selected-track {
  background-color: white;
  text-align: center;
  display: flex;
  flex-grow: 1;
  height: calc(100vh - 232px);
}

.right-scene {
  flex: 0 0 40%;
  background-color: white;
  overflow-y: scroll;
  overflow-x: hidden;
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
