<template>
  <html :class="colorMode.value ?? 'dark'" >  
    <div class="min-h-[100vh] bg-white dark:bg-custom-dark">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </html>
</template>

<script setup>
const colorMode = useColorMode()
</script>