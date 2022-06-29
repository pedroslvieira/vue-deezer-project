<script setup>
import TrackListElement from "@/components/TrackListElement.vue";

defineProps({
  tracks: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div v-if="tracks">
    <div v-for="track in tracks">
      <TrackListElement :track="track" />
    </div>
  </div>
</template>
