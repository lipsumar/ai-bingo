<script setup lang="ts">
import { usePlayStore } from "@/stores/play";
import AnswerButton from "./AnswerButton.vue";
import { computed } from "vue";

const playStore = usePlayStore();

const currentQuestion = computed(() => playStore.currentQuestion);

function next() {
  const from_index = playStore.currentIndex;
  playStore.next();
  window.scrollTo({ top: 0, behavior: "smooth" });

  window.gtag("event", "game_next", {
    from_index,
    game_id: playStore.gameId,
  });
}
</script>
<template>
  <p class="text-2xl font-light mb-10">
    {{ currentQuestion.prompt }}
  </p>
  <div class="lg:flex lg:space-x-4 lg:justify-center mb-10">
    <div
      v-for="(img, imgIndex) in currentQuestion.images"
      :key="img.image"
      class="flex mb-4 flex-col border rounded-br-lg rounded-bl-lg overflow-hidden max-w-[512px]"
    >
      <div class="flex-grow">
        <div class="bg-slate-100 lg:mx-auto">
          <img
            :src="`/images/prompts/${img.image}`"
            class="object-scale-down"
          />
        </div>
      </div>
      <div class="grid grid-cols-3 border-t">
        <div class="border-r">
          <AnswerButton ai="de" :img-index="imgIndex">DALL·E</AnswerButton>
        </div>
        <div class="border-r">
          <AnswerButton ai="mj" :img-index="imgIndex">Midjourney</AnswerButton>
        </div>
        <div>
          <AnswerButton ai="sd" :img-index="imgIndex"
            >Stable Diffusion</AnswerButton
          >
        </div>
      </div>
    </div>
  </div>
  <div class="text-right">
    <button
      class="border-2 border-bingo-white rounded-lg px-6 py-4 text-xl font-light disabled:opacity-50"
      @click="() => next()"
      :disabled="!playStore.canContinue"
    >
      Next ⟶
    </button>
  </div>
</template>
