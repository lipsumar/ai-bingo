<script setup lang="ts">
import PlayEnd from "@/components/PlayEnd.vue";
import PlayProgress from "@/components/PlayProgress.vue";
import PlayQuestion from "@/components/PlayQuestion.vue";
import { usePlayStore } from "@/stores/play";

const playStore = usePlayStore();
playStore.init();
</script>
<template>
  <div class="container mx-auto my-8">
    <div class="mb-8 max-w-[300px] mx-auto">
      <PlayProgress />
    </div>
    <PlayQuestion v-if="!playStore.isComplete" />
    <PlayEnd v-else />
  </div>
</template>
