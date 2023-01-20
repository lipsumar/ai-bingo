<script setup lang="ts">
import { usePlayStore } from "@/stores/play";
import AnswerButton from "./AnswerButton.vue";
import { computed } from "vue";

const playStore = usePlayStore();

const currentQuestion = computed(() => playStore.currentQuestion);
</script>
<template>
  <p class="text-center text-2xl mb-8">{{ currentQuestion.prompt }}</p>
  <div class="lg:flex lg:space-x-4 lg:justify-center">
    <div
      v-for="(img, imgIndex) in currentQuestion.images"
      :key="img.image"
      class="flex mb-4 lg:flex-col"
    >
      <div class="flex-grow mr-4">
        <div class="border rounded bg-slate-100 lg:mx-auto">
          <img
            :src="`/images/prompts/${img.image}`"
            class="object-scale-down"
          />
        </div>
      </div>
      <div
        class="flex-grow lg:text-center lg:pt-8 lg:flex lg:flex-col lg:items-center"
      >
        <AnswerButton ai="de" :img-index="imgIndex">DALL·E</AnswerButton>
        <AnswerButton ai="mj" :img-index="imgIndex">Midjourney</AnswerButton>
        <AnswerButton ai="sd" :img-index="imgIndex"
          >Stable Diffusion</AnswerButton
        >
      </div>
    </div>
  </div>
  <button
    class="w-full py-4 text-lg bg-slate-700 text-white rounded-lg font-bold disabled:bg-slate-400"
    @click="() => playStore.next()"
    :disabled="!playStore.canContinue"
  >
    Next
  </button>
</template>
