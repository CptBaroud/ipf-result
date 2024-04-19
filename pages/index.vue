<template>

  <section class="relative">
    <div
    class="absolute top-0 -left-[30rem] text-white overflow-hidden overflow-y-hidden max-h-full"
  >
    <p
      v-for="i in 32"
      :key="i"
      class="w-full text-[32rem] leading-none font-black text-transparent opacity-[.07] -mb-24 whitespace-nowrap"
      :style="`margin-left : -${Math.floor(Math.random() * 77)}rem`"
      style="text-stroke: 4px white; -webkit-text-stroke: 4px white"
    >
      ABSR - RESULTS - ASBR
    </p>
  </div>
    <div class="container flex-col">
      <ul
        class="w-full relative grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-4 lg:gap-8 py-8 lg:py-24"
      >
        <li v-for="item in data" :key="item.name">
          <resultsCard
            :Name="item.Name"
            :Division="item.Division"
            :WeightClassKg="item.WeightClassKg"
            :BestSquatKg="item.Best3SquatKg"
            :BestBenchKg="item.Best3BenchKg"
            :BestDeadliftKg="item.Best3DeadliftKg"
            :TotalKg="item.TotalKg"
            :Dots="item.Dots"
            :MeetName="item.MeetName"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const { data } = await useAsyncData("index-data", async () => {
  const item = await queryContent("/").findOne();

  return item.body;
});

useHead({
  title: `ASBR - Resultats comp`,
});

useSeoMeta({
  title: `ASBR - Resultats comp`,
  ogTitle: `ASBR - Resultats comp`,
  ogType: "article",
  description: "Résultats de compétition des athlètes de l'ASBR",
  ogDescription: "Résultats de compétition des athlètes de l'ASBR",
  twitterCard: "summary_large_image",
});
</script>
