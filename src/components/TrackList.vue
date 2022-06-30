<script setup>
import TrackListElement from "@/components/TrackListElement.vue";

const props = defineProps({
  tracks: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["trackSelected"]);

const selectThisTrack = (track) => {
  emit("trackSelected", track);
};
</script>

<template>
  <div v-if="tracks">
    <div v-for="track in tracks" :key="track.position" class="song" @click="selectThisTrack(track)">
      <TrackListElement :track="track" />
    </div>
  </div>
</template>
