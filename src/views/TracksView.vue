<script setup>
import axios from "axios";
import { ref } from "vue";
import TrackList from "@/components/TrackList.vue";

const apiUrl = "https://pedroslvieira-deezer-backend.herokuapp.com/api/v1/tracks";
const tracksApi = ref([]);
const selectedTrack = ref({});

// Using top-level await
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

const isPlaying = ref(false);
const player = new Audio();

const play = () => {
  player.play();
  isPlaying.value = true;
};

const pause = () => {
  player.pause();
  isPlaying.value = false;
};

const nextTrack = (track) => {
  selectedTrack.value.explicit_lyrics = false;
  let index = tracksApi.value.indexOf(track);
  index++;
  if (index > tracksApi.value.length - 1) {
    selectedTrack.value = tracksApi.value[0];
  } else {
    selectedTrack.value = tracksApi.value[index];
  }
  player.src = selectedTrack.value.preview;
  selectedTrack.value.explicit_lyrics = true;
  if (isPlaying.value == true) {
    player.play();
    isPlaying.value = true;
  }
};

const prevTrack = (track) => {
  selectedTrack.value.explicit_lyrics = false;
  let index = tracksApi.value.indexOf(track);
  index--;
  if (index < 0) {
    selectedTrack.value = tracksApi.value[9];
  } else {
    selectedTrack.value = tracksApi.value[index];
  }
  player.src = selectedTrack.value.preview;
  selectedTrack.value.explicit_lyrics = true;
  if (isPlaying.value == true) {
    player.play();
    isPlaying.value = true;
  }
};

const updateTrack = (track) => {
  selectedTrack.value.explicit_lyrics = false;
  selectedTrack.value = track;
  selectedTrack.value.explicit_lyrics = true;
  player.src = selectedTrack.value.preview;
  if (isPlaying.value == true) {
    player.play();
    isPlaying.value = true;
  }
};

const windowWidth = ref();
const mobile = ref(true);

const checkScreen = () => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value < 800) {
    mobile.value = true;
    return;
  }
  mobile.value = false;
  return;
};
checkScreen();

window.addEventListener("resize", checkScreen);
player.addEventListener("ended", () => {
  nextTrack(selectedTrack.value);
});
</script>

<template>
  <div id="root" :class="{ 'root-big-screen': !mobile, 'root-mobile': mobile }">
    <transition name="slide-left">
      <div v-if="!mobile" class="left-scene">
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
                <font-awesome-icon class="play-button" icon="play" />
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
    </transition>
    <transition name="fade">
      <div class="player-mobile" v-if="mobile && selectedTrack.title">
        <div class="track-mobile-cover">
              <img class="mobile-cover" :src="selectedTrack.album.cover_small" />
        </div>
        <div class="list-track-details">
          <h2 class="list-track-title" v-if="selectedTrack.title.length > 20">
            {{ selectedTrack.title.substring(0, 20) + ".." }}
          </h2>
          <h2 class="list-track-title" v-else>
            {{ selectedTrack.title }}
          </h2>
          <p class="list-track-artist">{{ selectedTrack.artist.name }}</p>
        </div>
        <div class="mobile-commands">
          <button class="mobile-play" v-if="!isPlaying" @click="play">
            <font-awesome-icon icon="play" />
          </button>
          <button class="mobile-pause" v-else @click="pause">
            <font-awesome-icon icon="pause" />
          </button>
        </div>
      </div>
    </transition>
    <div class="right-scene" :class="{ 'right-scene-big-screen': !mobile, 'right-scene-mobile': mobile, 'right-scene-mobile-selected': mobile && selectedTrack.title  }">
      <img id="loading" src="https://i.stack.imgur.com/kOnzy.gif" alt="">
      <TrackList
        :tracks="tracksApi"
        @track-selected="updateTrack"
        :key="componentKey"
      />
    </div>
  </div>
</template>

<style>
/* Transition player-desktop */
.slide-left-enter-active {
  transition: 1s 0.2s ease all;
}

.slide-left-leave-active {
  transition: 1s 0.2s ease all;
}

.slide-left-enter-from {
  opacity: 0;
}

/* Transition player-mobile */
.fade-enter-active {
  transition: 1s 0.5s ease transform;
}

.fade-leave-active {
  transition: 1s ease-in-out transform;
  position: absolute;
  bottom: 0;
  right:0;
}

.fade-leave-to,
.fade-enter-from {
  transform: translateY(100px);
  opacity: 1;
  width: 300px;
}

.fade-enter-to {
  transform: translate(0);
}

#root {
  display: flex;
  position: relative;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
}

.root-big-screen {
  height: 550px;
  width: 750px;
  transition: 1s 0.5s ease-in-out all;
}

.root-mobile {
  flex-direction: column;
  height: calc(100vh - 100px);
  width: 350px;
  overflow: hidden;
  align-items: flex-end;
  transition: 1s ease-in-out all;
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
  position: absolute;
  left: 0;
  width: 450px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: solid 1px lightgray;
}

.selected-track {
  text-align: center;
  display: flex;
  flex-grow: 1;
  height: calc(100vh - 232px);
}

.right-scene {
  overflow-y: scroll;
  overflow-x: hidden;
}

.right-scene-big-screen {
  position: absolute;
  right: 0;
  width: 300px;
  height: 100%;
  transition: 1s 0.2s all ease-in-out;
}

.right-scene-mobile {
  width: 350px;
  height: 100%;
  transition: 1s 0.5s all ease-in-out;
}

.right-scene-mobile-selected {
  /* flex: 0 0 85%; */
  height: 85%;
  width: 350px;
}

.player-mobile {
  flex: 0 0 15%;
  background-color: rgba(255,255,255,1);
  border-top: solid 1px lightgray;
  display: flex;
  padding: 10px;
  align-items: center;
  width: 350px;
  position: absolute;
  z-index: 100;
  bottom: 0;
}

.track-mobile-cover {
  height: 56px;
  margin: 5px;
}

.mobile-cover {
  border-radius: 5px;
}

.mobile-commands {
  margin-left: auto;
}

.mobile-play,
.mobile-pause {
  width: 70px;
  height: 70px;
  justify-content: center;
  cursor: pointer;
  font-size: 30px;
  color: #000;
  margin: 0;
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

.bg-track-list {
  background-color: white;
}

#loading {
  height: 40px;
  transform: translate(-50%, 50%);
  position: absolute;
  bottom: 50%;
  left: 50%;
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

.play-button {
  transform: translate(2px, 0px);
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

@media (prefers-color-scheme: dark) {
  .right-scene::-webkit-scrollbar { width: 10px; height: 100%; background-color: #2B2B2B; }
  .right-scene::-webkit-scrollbar-thumb { background: #6B6B6B; border: solid 2px transparent; background-clip: content-box; border-radius: 9px; }

  .left-scene {
    border-right: solid 1px #333434;
  }

  .playing{
  background-color: #222526;
  }

  .list-element:hover {
  background-color: #222526;
  }

  .artist,
  .list-track-artist {
    color: var(--vt-c-text-dark-2);
  }

  .track-title,
  .mobile-play,
  .mobile-pause,
  .selected-track,
  .list-track-title {
    color: var(--vt-c-text-dark-1);
  }

  .next,
  .prev {
    background-color: rgba(255, 255, 255, 0.5);
    color: #181A1B;
  }

  .pause,
  .play {
    color: #181A1B;
    background-color: white;
    background-image: none;
  }

  .bg-track-list,
  #root {
    background-color: var(--vt-c-black);
  }

  .player-mobile {
    background-color: var(--vt-c-black);
    border-top: solid 1px #333434;
  }
}
</style>
