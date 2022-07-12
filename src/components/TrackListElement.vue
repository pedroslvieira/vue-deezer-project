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
      <div class="list-track-long-title" v-if="track.title.length > 20">
        <span class="span animate">{{ track.title }}</span>
      </div>
      <div class="list-track-title" v-else>
        <span class="span">{{ track.title }}</span>
      </div>
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
  background-color: #ededed;
  cursor: pointer;
}

.active {
  background-color: lightgray;
}

.track-cover {
  margin: 5px;
}

.list-track-details {
  margin-left: 5px;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.list-track-long-title {
  height: 25px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
}

.list-track-title {
  height: 25px;
  width: 100%;
  overflow: hidden;
}

.animate {
  position: relative;
  animation: leftright 3s infinite alternate ease-in-out;
}

@keyframes leftright {
  0%,
  10% {
    transform: translateX(0%);
    left: 0%;
  }
  90%,
  100% {
    transform: translateX(-100%);
    left: 100%;
  }
}

.span {
  font-weight: 600;
  display: inline-block;
  text-align: left;
  color: #53565a;
  font-size: medium;
}

.list-track-artist {
  font-weight: 400;
  text-align: left;
}

.cover {
  border-radius: 5px;
}
</style>
