<script setup>
import TrackListElement from "@/components/TrackListElement.vue";

const props = defineProps({
  tracks: {
    type: Array,
    required: true,
  },
});

props.tracks.forEach((track) => {
  track.explicit_lyrics = false;
});

const emit = defineEmits(["trackSelected"]);
</script>

<template>
  <div class="bg-track-list" v-if="tracks">
    <div v-for="track in tracks" :class="{playing: track.explicit_lyrics}" :key="track.position" class="song" @click="emit('trackSelected', track)">
      <TrackListElement :track="track" />
    </div>
  </div>
</template>

<style>
.playing{
  background-color: var(--bg-playing);
}
</style>
