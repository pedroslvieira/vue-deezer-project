<script setup>
defineProps({
  selectedTrack: {
    type: Object,
  },
});
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
  </div>
</template>

<style>
.player {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
}

.track-title,
.artist {
  text-align: center;
}
</style>
