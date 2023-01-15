<script setup lang="ts">
import { usePlayStore } from "@/stores/play";

const playStore = usePlayStore();
</script>
<template>
  <div class="text-center text-3xl">
    {{ playStore.score }}/{{ playStore.answers.length }}
  </div>
</template>
