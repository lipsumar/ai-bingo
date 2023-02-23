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
        <div class="p-16 relative z-10 xl:mr-32">
          <img :src="logoSrc" class="w-8/12 mb-12" />
          <h2 class="text-3xl font-thin mb-8">
            A <span class="text-bingo-orange">DALL•E</span>,
            <span class="text-bingo-orange">Midjourney</span> and
            <span class="text-bingo-orange">Stable Diffusion</span> guessing
            game
          </h2>

          <p class="text-2xl font-thin mb-16">
            Midjourney, Dalle and Stable Diffusion, walk into a prompt...
            <span class="font-bold">Can you guess which is which ?</span><br />
            A game that's sure to be more entertaining than watching three
            artists try to share a canvas!
          </p>

          <button
            class="border-2 border-bingo-white rounded-lg px-6 py-4 text-xl font-light"
            @click="state.play = true"
          >
            Play now ⟶
          </button>

          <footer class="mt-14 text-lg opacity-80">
            AI BINGO. A human generated guess game by
            <a href="https://twitter.com/lipsumar" class="underline"
              >@lipsumar</a
            >
            and
            <a href="https://instagram.com/paulmarique" class="underline"
              >@paulmarique</a
            >
          </footer>
        </div>
      </div>
      <div class="w-full md:w-6/12 md:h-full h-96 bg-bingo-orange">
        <img :src="homeIlluSrc" class="md:invisible relative -top-32" />
      </div>
    </main>
  </div>
  <PlayView v-else />
</template>
