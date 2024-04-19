<template>
  <div
    class="h-full"
  >
    <div
      class="min-h-100vh flex flex-col text-white bg-neutral-1 <md:pt-15 overflow-hidden relative"
    >
      <SiteHeader />
      <slot />
      <SiteFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="postcss">
</style>
