<script setup>
// TODO import Track component

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
      <!-- TODO code component <Track :track="track" /> -->
    </div>
  </div>
</template>
