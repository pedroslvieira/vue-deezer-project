<script setup>
import axios from "axios";
import { ref } from "vue";
import TrackList from "@/components/TrackList.vue";

const apiUrl = "https://pedroslvieira-deezer-backend.herokuapp.com/api/v1/tracks";
const tracksApi = ref([]);
const selectedTrack = ref({});

// const response = await axios.get(apiUrl);
// tracksApi.value = response.data.data;

const componentKey = ref(0);

const reloadComponent = () => {
  componentKey.value += 1;
}

const loadTracks = async () => {
  const response = await axios.get(apiUrl);
  tracksApi.value = response.data.data;
  reloadComponent();
};
loadTracks();

// const loadTracks = () => {
//   setTimeout(() => {
//     const response = axios.get(apiUrl);
//     console.log(response.PromiseResult);
//     tracksApi.value = response.data.data;
//     console.log("loading songs...");
//   }, 2000);
// };
// loadTracks();

// const loadTracks = async () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(() => {
//         const response = axios.get(apiUrl);
//         tracksApi.value = response.data.data;
//         console.log("loaded");
//       });
//     }, 2000);
//   });
// };
// loadTracks();

const isPlaying = ref(false);
const player = new Audio();

const play = () => {
  player.src = selectedTrack.value.preview;
  player.play();
  isPlaying.value = true;
};

const pause = () => {
  player.pause();
  isPlaying.value = false;
};

const nextTrack = (track) => {
  console.log("hello");
  let index = tracksApi.value.indexOf(track);
  console.log(index);
  index++;
  console.log(index);
  if (index > tracksApi.value.length - 1) {
    selectedTrack.value = tracksApi.value[0];
  } else {
    selectedTrack.value = tracksApi.value[index];
  }
  player.src = selectedTrack.value.preview;
  if (isPlaying.value == true) {
    player.play();
    isPlaying.value = true;
  }
};

const prevTrack = (track) => {
  let index = tracksApi.value.indexOf(track);
  index--;
  if (index < 0) {
    selectedTrack.value = tracksApi.value[9];
  } else {
    selectedTrack.value = tracksApi.value[index];
  }
  player.src = selectedTrack.value.preview;
  if (isPlaying.value == true) {
    player.play();
    isPlaying.value = true;
  }
};

const updateTrack = (track) => {
  selectedTrack.value = track;
  player.src = selectedTrack.value.preview;
  if (isPlaying.value == true) {
    player.play();
    isPlaying.value = true;
  }
};

player.addEventListener("ended", function () {
  nextTrack(selectedTrack.value);
});
</script>

<template>
  <div id="root">
    <div class="left-scene">
      <div class="selected-track">
        <div v-if="!selectedTrack.title" class="welcome">
          <h1 class="welcome-title">Welcome!</h1>
          <p class="welcome-p">Choose a song on the list to start listening</p>
        </div>
        <div class="player" v-else>
          <div class="cover-wrapper">
            <img :src="selectedTrack.album.cover_medium" />
          </div>
          <div class="track-details">
            <h2 class="track-title">
              {{ selectedTrack.title }}
            </h2>
            <p class="artist">{{ selectedTrack.artist.name }}</p>
          </div>
          <div class="commands">
            <button class="prev" @click="prevTrack(selectedTrack)">
              <font-awesome-icon icon="step-backward" />
            </button>
            <button class="play" v-if="!isPlaying" @click="play">
              <font-awesome-icon icon="play" />
            </button>
            <button class="pause" v-else @click="pause">
              <font-awesome-icon icon="pause" />
            </button>
            <button class="next" @click="nextTrack(selectedTrack)">
              <font-awesome-icon icon="step-forward" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="right-scene">
      <img id="loading" src="https://icon-library.com/images/loading-icon-animated-gif/loading-icon-animated-gif-19.jpg" alt="">
      <TrackList
        :tracks="tracksApi"
        @track-selected="updateTrack"
        :key="componentKey"
      />
    </div>
  </div>
</template>

<style>
#root {
  display: flex;
  height: calc(100vh - 100px);
  width: 800px;
}

.welcome {
  width: 300px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.welcome-title {
  font-weight: 200;
}

.welcome-p {
  width: 200px;
  font-weight: 300;
  margin-top: 15px;
  font-size: 16px;
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

#loading {
  height: 100px;
  position: absolute;
  top: 40%;
  left: 30%;
}
.bg-track-list {
  background-color: white;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.player {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
}

.track-details {
  margin-top: 5px;
  width: 300px;
}

.track-title {
  color: #53565a;
  font-size: medium;
  font-weight: 600;
}

.artist {
  text-align: center;
}

button {
  appearance: none;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
  transform: scale(1.1);
}

.commands {
  display: flex;
  margin-top: 25px;
}
.play,
.pause {
  background-image: linear-gradient(to right top,#d16ba5,#c777b9,#ba83ca,#aa8fd8,#9a9ae1,#8aa7ec,#79b3f4,#69bff8,#52cffe,#41dfff,#46eefa,#5ffbf1);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  justify-content: center;
  cursor: pointer;
  font-size: 25px;
  color: #fff;
  margin-left: 20px;
  margin-right: 20px;
}

.next,
.prev {
  border: 0;
  border-radius: 50%;
  font-size: 20px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: rgba(0,0,0,.09);
  color: #fff;
  transition: background-color .2s;
  position: relative;
}
</style>
