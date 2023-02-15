<script setup lang="ts">
import { usePlayStore } from "@/stores/play";
import { computed } from "vue";

const playStore = usePlayStore();

const progress = computed(() => {
  return (playStore.currentIndex / playStore.total) * 100;
});
</script>
<template>
  <div class="h-2 w-full">
    <div
      class="h-full bg-bingo-orange w-full transition-width"
      :style="`width:${progress}%`"
    ></div>
  </div>
</template>
