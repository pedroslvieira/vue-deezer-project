<script setup>
import { ref } from "vue";
defineProps({
  track: {
    type: Object,
    required: true,
  },
});

const isActive = ref(false);

const activate = () => {
  isActive.value = !isActive.value;
};
</script>

<template>
  <div class="list-element" @click="activate">
    <div class="track-cover">
      <img class="cover" :src="track.album.cover_small" />
    </div>
    <div class="list-track-details">
      <h2 class="list-track-title" v-if="track.title.length > 20">
        {{ track.title.substring(0, 20) + ".." }}
      </h2>
      <h2 class="list-track-title" v-else>
        {{ track.title }}
      </h2>
      <p class="list-track-artist">{{ track.artist.name }}</p>
    </div>
  </div>
</template>

<style>
.list-element {
  display: flex;
  padding: 10px;
}
.list-element:hover {
  background-color: var(--bg-playing);
  cursor: pointer;
}

.active {
  background-color: var(--bg-playing);
}

.track-cover {
  margin: 5px;
}

.list-track-details {
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.list-track-title {
  color: var(--text-color-1);
  font-size: medium;
  font-weight: 600;
  text-align: left;
}

.list-track-artist {
  color: var(--text-color-1);
  font-weight: 400;
  text-align: left;
}

.cover {
  border-radius: 5px;
}
</style>
