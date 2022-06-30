<script setup>
import TrackListElement from "@/components/TrackListElement.vue";

defineProps({
  tracks: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["trackSelected"]);
</script>

<template>
  <div v-if="tracks">
    <div v-for="track in tracks" :key="track.position" class="song" @click="emit('trackSelected', track)">
      <TrackListElement :track="track" />
    </div>
  </div>
</template>
