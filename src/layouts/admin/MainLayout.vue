<script setup>
import NavBar from '../../components/NavBar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <NavBar />
  <main class="px-6 py-4 mx-auto max-w-[1400px]">
    <RouterView />
  </main>
  <div class="fixed -z-10 top-0 left-0 h-full w-full bg-white">
    <div
      class="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
    ></div>
  </div>
</template>
