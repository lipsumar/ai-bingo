<script setup lang="ts">
import { usePlayStore } from "@/stores/play";

const playStore = usePlayStore();

const props = defineProps<{ label: string; score: number }>();
const total = playStore.questions?.length;
</script>
<template>
  <div class="text-center basis-1/3">
    <div class="text-3xl">{{ props.score }}/{{ total }}</div>
    <div class="text-xl">{{ props.label }}</div>
  </div>
</template>
