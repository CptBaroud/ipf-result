<template>
  <footer class="font-thunder font-medium text-custom-dark/75 dark:text-white/75">
    <div class="container w-full justify-center items-center flex flex-col">
        <h2 class="text-lg">
          Donnée extraites du
          <a
            class="text-custom-dark/30 dark:text-white/30"
            target="_blank"
            href="https://openpowerlifting.gitlab.io/opl-csv/bulk-csv.html"
            >26/04/2024</a
          >
          depuis
          <a
            class="text-custom-dark/30 dark:text-white/30"
            target="_blank"
            href="https://www.openipf.org/rankings/ipf"
            >OpenIPF</a
          >
        </h2>
        <h2 class="text-lg pt-4">Fait par Gurvan avec ❤️</h2>
      <span class="flex flex-row gap-2">
        <button class="py-2 px-4" @click="$colorMode.preference = 'light'">Light</button>
        <button class="py-2 px-4" @click="$colorMode.preference = 'dark'">Dark</button>
      </span>
    </div>
  </footer>
</template>
