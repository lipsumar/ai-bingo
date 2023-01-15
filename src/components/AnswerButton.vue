<script setup lang="ts">
import { computed } from "vue";
import { usePlayStore } from "@/stores/play";

const playStore = usePlayStore();

const props = defineProps<{ ai: string; imgIndex: number }>();

//const emits = defineEmits<{ (e: "click", evt: MouseEvent): void }>();

const selected = computed(
  () => playStore.selection[props.imgIndex] === props.ai
);
const disabled = computed(
  () => playStore.selection.includes(props.ai) && !selected.value
);
</script>
<template>
  <button
    class="px-4 py-2 bg-slate-400 text-white font-bold rounded-lg w-full lg:w-48 mb-4"
    :class="{
      'bg-slate-600': selected,
      'bg-slate-300': disabled,
    }"
    @click="() => playStore.select(imgIndex, props.ai)"
  >
    <slot />
  </button>
</template>
