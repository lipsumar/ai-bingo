<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <main class="h-screen flex flex-col items-center justify-center">
    <h1 class="text-4xl mb-10">🎰 AI Bingo!</h1>
    <RouterLink
      to="/play"
      class="w-40 py-4 font-bold bg-slate-500 text-white text-center rounded-lg"
      >Play now</RouterLink
    >
  </main>
</template>
