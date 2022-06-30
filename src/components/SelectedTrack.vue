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
