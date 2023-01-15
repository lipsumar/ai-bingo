<script setup lang="ts">
import { usePlayStore } from "@/stores/play";
import { computed } from "vue";

const playStore = usePlayStore();

const progress = computed(() => {
  console.log("compute", playStore.total);
  return (playStore.currentIndex / playStore.total) * 100;
});
</script>
<template>
  <div class="h-4 rounded-full w-full border border-sky-800 border-2">
    <div
      class="h-full bg-sky-800 w-1/2 rounded-full"
      :style="`width:${progress}%`"
    ></div>
  </div>
</template>
