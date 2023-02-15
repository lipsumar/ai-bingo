<script setup lang="ts">
import logoSrc from "@/assets/logo.svg";
import homeIlluSrc from "@/assets/home-illu.png";
import { reactive } from "vue";
import PlayView from "@/components/PlayView.vue";

const state = reactive({ play: false });
</script>

<template>
  <div v-if="!state.play">
    <img
      :src="homeIlluSrc"
      class="absolute top-80 md:top-32 left-32 md:left-64 z-0 w-4/5 hidden md:block"
    />
    <main class="h-screen md:flex">
      <div class="md:w-6/12">
        <div class="p-16 relative z-10">
          <img :src="logoSrc" class="w-8/12 mb-12" />
          <p class="text-lg mb-12">
            Midjourney, Dalle, and Stable Diffusion walk into a prompt... but
            can you guess which image belongs to who? A guessing game that's
            sure to be more entertaining than watching three artists try to
            share a canvas!
          </p>

          <button
            class="border-2 border-bingo-white rounded-lg px-6 py-4 text-xl font-light"
            @click="state.play = true"
          >
            Play now ⟶
          </button>
        </div>
      </div>
      <div class="w-full md:w-6/12 md:h-full h-96 bg-bingo-orange">
        <img :src="homeIlluSrc" class="md:invisible relative -top-32" />
      </div>
    </main>
  </div>
  <PlayView v-else />
</template>
