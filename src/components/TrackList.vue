<script setup>
import TrackListElement from "@/components/TrackListElement.vue";
import axios from "axios";
import { ref } from "vue";

defineProps({
  tracks: {
    type: Array,
    required: true,
  },
});
// const apiUrl = "https://pedroslvieira-deezer-backend.herokuapp.com/api/v1/tracks";
// const tracksApi = ref([]);
// const response = await axios.get(apiUrl);
// tracksApi.value = response.data.data;
// console.log(tracksApi.value);
// tracksApi.value = response.data.data;

const emit = defineEmits(["trackSelected"]);
</script>

<template>
  <div class="bg-track-list" v-if="tracks">
    <div v-for="track in tracks" :key="track.position" class="song" @click="emit('trackSelected', track)">
      <TrackListElement :track="track" />
    </div>
  </div>
</template>
