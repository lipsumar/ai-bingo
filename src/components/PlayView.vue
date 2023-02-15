<script setup lang="ts">
import PlayEnd from "@/components/PlayEnd.vue";
import PlayProgress from "@/components/PlayProgress.vue";
import PlayQuestion from "@/components/PlayQuestion.vue";
import { usePlayStore } from "@/stores/play";
import logoSrc from "@/assets/logo.svg";

const playStore = usePlayStore();
playStore.init();
window.gtag("event", "game_new", {
  game_id: playStore.gameId,
});
</script>
<template>
  <PlayProgress v-if="!playStore.isComplete" />
  <div class="container mx-auto my-10" v-if="!playStore.isComplete">
    <div class="md:flex items-end mb-10">
      <img :src="logoSrc" class="w-80" />
      <div
        class="md:ml-10 mt-2 md:mt-0 font-light leading-none"
        v-if="!playStore.isComplete"
      >
        PROMPT: {{ playStore.currentIndex + 1 }}/{{ playStore.total }}
      </div>
    </div>

    <PlayQuestion />
  </div>
  <PlayEnd v-if="playStore.isComplete" />
</template>
