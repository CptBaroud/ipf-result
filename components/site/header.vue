<template>
  <header class="w-full z-100 py-4 bg-white dark:bg-custom-dark">
    <div
      class="container justify-between items-end py-4 flex-row"
      style="backdrop-filter: blur(6px)"
    >
      <NuxtLink
        to="/"
        class="text-xl lg:text-3xl z-10 font-bold font-thunder dark:text-white text-custom-dark"
      >
        <p><span class="font-extrabold">ASBR</span> - Resultats compétitions</p>
      </NuxtLink>
      <NuxtLink
        to="/classement"
        class="text-xl lg:text-3xl z-10 font-regular font-thunder dark:text-white text-custom-dark"
      >
        <p>Classement</p>
      </NuxtLink>
    </div>
  </header>
</template>
