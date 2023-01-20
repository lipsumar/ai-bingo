<script setup lang="ts">
import { usePlayStore } from "@/stores/play";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/vue/24/solid";
import OneAIScore from "./OneAIScore.vue";

const playStore = usePlayStore();
type Img = { ai: string; image: string };

const aiToLabel = {
  sd: "Stable Diffusion",
  mj: "Midjourney",
  de: "DALL·E",
} as { [key: string]: string };

const overallScore = Math.ceil(
  (playStore.scorePerAi.de +
    playStore.scorePerAi.mj +
    playStore.scorePerAi.sd) *
    3.3333
);

function sortImages(images: Img[], answers: string[]) {
  const imagesByAi = images.reduce((acc, img, i) => {
    acc[img.ai] = { ...img, answer: answers[i] };
    return acc;
  }, {} as Record<string, Img & { answer: string }>);
  return [imagesByAi.de, imagesByAi.mj, imagesByAi.sd];
}
</script>
<template>
  <div class="text-center text-5xl mb-8">{{ overallScore }}%</div>

  <div class="flex justify-between space-x-4 mb-12">
    <OneAIScore :label="aiToLabel.de" :score="playStore.scorePerAi.de" />
    <OneAIScore :label="aiToLabel.mj" :score="playStore.scorePerAi.mj" />
    <OneAIScore :label="aiToLabel.sd" :score="playStore.scorePerAi.sd" />
  </div>

  <div
    v-for="(question, qi) in playStore.questions"
    :key="question.id"
    class="p-8 bg-slate-200 rounded mb-8"
  >
    <div class="flex space-x-4">
      <div
        v-for="(img) in sortImages(question.images, playStore.answers[qi] as string[])"
        :key="img.image"
      >
        <div class="relative">
          <img
            :src="`/images/prompts/${img.image}`"
            class="object-scale-down"
          />

          <div class="absolute bottom-4 right-4 flex items-center">
            <div class="bg-white rounded-full px-3 py-1 pr-6 -right-5 relative">
              {{ aiToLabel[img.answer] }}
            </div>
            <CheckCircleIcon
              v-if="img.answer === img.ai"
              class="w-12 h-12 text-green-500 bg-white rounded-full relative"
            />

            <XCircleIcon
              v-else
              class="w-12 h-12 text-red-500 bg-white rounded-full relative"
            />
          </div>
        </div>
        <p class="text-center font-bold">{{ aiToLabel[img.ai] }}</p>
      </div>
    </div>
    <p class="text-center mt-4">{{ question.prompt }}</p>
  </div>
</template>
