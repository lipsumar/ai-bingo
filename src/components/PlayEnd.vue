<script setup lang="ts">
import { usePlayStore } from "@/stores/play";
import OneAIScore from "./OneAIScore.vue";
import logoSrc from "@/assets/logo.svg";
import correctSrc from "@/assets/correct.svg";
import incorrectSrc from "@/assets/incorrect.svg";
import { onMounted } from "vue";
import { recordEvent } from "@/lib/events";

const playStore = usePlayStore();
type Img = { ai: string; image: string };

const aiToLabel = {
  sd: "Stable Diffusion",
  mj: "Midjourney",
  de: "DALL·E",
} as { [key: string]: string };

const overallScore = Math.ceil(
  ((playStore.scorePerAi.de +
    playStore.scorePerAi.mj +
    playStore.scorePerAi.sd) /
    (playStore.total * 3)) *
    100
);

onMounted(() => {
  recordEvent({
    type: "game_complete",
    score: overallScore,
    score_details: playStore.scorePerAi,
    game_id: playStore.gameId,
  });
});

function getScoreText(score: number) {
  if (score <= 10) {
    return "Looks like your neural network needs some more training data. Don't worry, even the best algorithms need a little help sometimes!";
  } else if (score <= 20) {
    return "It seems your AI assistant is feeling a bit under the weather today. Maybe it's time for a software update?";
  } else if (score <= 30) {
    return "Nice job, your AI co-pilot is starting to get the hang of things! Just remember, the machine learning journey is a marathon, not a sprint.";
  } else if (score <= 40) {
    return "Well done, your virtual apprentice is making progress by leaps and bounds! It won't be long until it's running the show.";
  } else if (score <= 50) {
    return "You're halfway there! Your digital sidekick is right on the money half the time - not too shabby for a machine learning newbie.";
  } else if (score <= 60) {
    return "Impressive, your artificial intelligence apprentice is really starting to flex its neural muscles! Who knows, maybe it will be taking over the world soon.";
  } else if (score <= 70) {
    return "Excellent work, your AI protégé is truly starting to shine! It's not quite ready to take on a Turing test, but it's getting there.";
  } else if (score <= 80) {
    return "Astounding! Your machine learning prodigy has proven itself to be a force to be reckoned with. The singularity is nigh!";
  } else if (score <= 90) {
    return "Unbelievable! Your virtual student has surpassed the master and achieved a level of artificial intuition that would make Skynet blush.";
  } else {
    return "Holy algorithm, you're an AI superstar! You've truly unlocked the secrets of machine learning and proven yourself to be the ultimate artificial intelligence whisperer.";
  }
}
const scoreText = getScoreText(overallScore);

function sortImages(images: Img[], answers: string[]) {
  const imagesByAi = images.reduce((acc, img, i) => {
    acc[img.ai] = { ...img, answer: answers[i] };
    return acc;
  }, {} as Record<string, Img & { answer: string }>);
  return [imagesByAi.de, imagesByAi.mj, imagesByAi.sd];
}

const filterCorrect =
  "background: linear-gradient(180deg, rgba(80, 190, 52, 0) 0%, rgba(67, 175, 39, 0) 32.29%, rgba(50, 175, 39, 0.372) 75%, rgba(42, 175, 39, 0.6) 100%)";
const filterIncorrect =
  "background: linear-gradient(180deg, rgba(175, 39, 39, 0) 0%, rgba(175, 39, 39, 0) 32.29%, rgba(175, 39, 39, 0.496) 75%, rgba(175, 39, 39, 0.8) 100%)";
</script>
<template>
  <main class="lg:flex">
    <div class="lg:w-5/12 bg-bingo-orange">
      <div class="bg-bingo-black">
        <div class="p-16">
          <img :src="logoSrc" class="w-8/12 mb-12" />
          <p class="mb-12 text-lg font-light">
            It's time to unveil the results of our little AI art experiment.
            Have you trained your neural network to the level of artistic
            mastermind, or are your machine learning skills need some updates?
          </p>
        </div>
      </div>
      <div class="p-16 md:pr-44 text-white">
        <div class="text-2xl uppercase">Final score</div>
        <div class="text-8xl">{{ overallScore }}%</div>
        <p class="text-lg font-bold leading-7 mb-12">{{ scoreText }}</p>
        <div
          class="flex flex-col md:flex-row md:h-full justify-between space-y-3 md:space-y-0"
        >
          <OneAIScore :label="aiToLabel.de" :score="playStore.scorePerAi.de" />
          <OneAIScore :label="aiToLabel.mj" :score="playStore.scorePerAi.mj" />
          <OneAIScore :label="aiToLabel.sd" :score="playStore.scorePerAi.sd" />
        </div>
      </div>
    </div>
    <div class="w-full lg:w-7/12 lg:h-full h-96">
      <div class="p-4 pt-16 md:p-16">
        <div
          v-for="(question, qi) in playStore.questions"
          :key="question.id"
          class="mb-8"
        >
          <p class="font-light mb-4">{{ question.prompt }}</p>
          <div class="flex space-x-4">
            <div
              v-for="(img) in sortImages(question.images, playStore.answers[qi] as string[])"
              :key="img.image"
            >
              <div class="relative rounded-lg overflow-hidden">
                <img
                  :src="`/images/prompts/${img.image}`"
                  class="object-scale-down"
                />

                <div
                  class="absolute top-0 right-0 bottom-0 left-0 opacity-60"
                  :style="
                    img.answer === img.ai ? filterCorrect : filterIncorrect
                  "
                ></div>
                <div class="absolute top-0 right-0 bottom-0 left-0">
                  <div
                    class="px-4 py-2 uppercase text-white text-lg font-bold"
                    style="text-shadow: 0 0 4px rgba(0, 0, 0, 0.5)"
                  >
                    {{ aiToLabel[img.ai] }}
                  </div>
                  <img
                    :src="correctSrc"
                    v-if="img.answer === img.ai"
                    class="w-1/3 m-auto xl:visible invisible"
                  />
                  <img
                    :src="incorrectSrc"
                    v-else
                    class="w-1/2 m-auto xl:visible invisible"
                  />
                  <div
                    :style="`text-shadow: 0 0 3px rgba(0, 0, 0, 0.6)`"
                    class="absolute bottom-0 left-0 p-4 text-white"
                  >
                    You answered {{ aiToLabel[img.answer].toUpperCase() }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
