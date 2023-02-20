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
          <h2 class="text-3xl font-thin">
            <span class="text-bingo-orange">DALL•E</span>
            <span class="opacity-80"> vs </span
            ><span class="text-bingo-orange">Midjourney</span>
            <span class="opacity-80"> vs </span
            ><span class="text-bingo-orange">Stable Diffusion</span>
          </h2>
          <h2 class="text-3xl mb-8">Can you tell which is which?</h2>

          <p class="text-lg mb-12">
            We gave the same prompts to DALL•E, Midjourney and Stable
            Diffusion.<br />
            Can you guess which is which ?
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
