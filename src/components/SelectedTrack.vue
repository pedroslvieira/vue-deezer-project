<script setup>
import { ref } from "vue";

const props = defineProps({
  selectedTrack: {
    type: Object,
  },
});

const emit = defineEmits(["nextTrack"]);

const isPlaying = ref(false);
const player = new Audio();

const play = () => {
  player.src = props.selectedTrack.preview;
  player.play();
  isPlaying.value = true;
};

const pause = () => {
  player.pause();
  isPlaying.value = false;
};
</script>

<template>
  <div v-if="!selectedTrack">
    <h1>select a song to play</h1>
  </div>
  <div class="player" v-if="selectedTrack">
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
      <button class="prev">
        <font-awesome-icon icon="step-backward" />
      </button>
      <button class="play" v-if="!isPlaying" @click="play">
        <font-awesome-icon icon="play" />
      </button>
      <button class="pause" v-else @click="pause">
        <font-awesome-icon icon="pause" />
      </button>
      <button class="next" @click="emit('nextTrack', selectedTrack)">
        <font-awesome-icon icon="step-forward" />
      </button>
    </div>
  </div>
</template>

<style>
.player {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
}

.track-details{
  margin-top: 5px;
}

.track-title,
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
};

</style>
