<script setup>
defineProps({
  selectedTrack: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="player">
    {{ selectedTrack.title }}
  </div>
</template>
