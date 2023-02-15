<script setup lang="ts">
import { usePlayStore } from "@/stores/play";

const playStore = usePlayStore();

const props = defineProps<{ label: string; score: number }>();
const total = playStore.questions?.length;
</script>
<template>
  <div class="">
    <div class="text-3xl font-bold">{{ props.score }}/{{ total }}</div>
    <div class="text-xl font-light">{{ props.label }}</div>
  </div>
</template>
