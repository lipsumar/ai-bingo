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
    class="px-4 py-2 transparent w-full h-20 flex items-center justify-center flex-grow uppercase"
    :class="{
      'bg-orange-600': selected,
      'opacity-50': disabled,
    }"
    @click="() => playStore.select(imgIndex, props.ai)"
  >
    <slot />
  </button>
</template>
