<script setup>
defineProps({
  track: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="list-element">
    <div class="track-cover">
      <img class="cover" :src="track.album.cover_small" />
    </div>
    <div class="track-details">
      <h2 class="track-title">
        {{ track.title.substring(0,50) + ".." }}
      </h2>
      <p class="track-artist">{{ track.artist.name }}</p>
    </div>
  </div>
</template>

<style>
.list-element {
  display: flex;
  padding: 10px;
}
.list-element:hover {
  background-color: #ededed;
}

.track-cover {
  margin: 5px;
}

.track-details {
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.track-title {
  color: #53565a;
  font-size: medium;
  font-weight: 600;
  text-align: left;
}

.track-artist {
  font-weight: 400;
  text-align: left;
}

.cover {
  border-radius: 5px;
}
</style>
