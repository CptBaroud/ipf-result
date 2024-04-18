<template>
  <main class="bg-custom-dark">
    <section>
      <div class="container flex-col">
        <h1 class="text-4xl lg:text-6xl z-10 font-bold font-thunder text-white">
          <span class="font-extrabold">ASBR</span> - Resultats comp
        </h1>
        <ul class="w-full relative grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-4 lg:gap-8 py-8 lg:py-24">
          <li v-for="item in filteredData" :key="item.name">
            <resultsCard
              :Name="item.Name"
              :Division="item.Division"
              :WeightClassKg="item.WeightClassKg"
              :BestSquatKg="item.Best3SquatKg"
              :BestBenchKg="item.Best3BenchKg"
              :BestDeadliftKg="item.Best3DeadliftKg"
              :TotalKg="item.TotalKg"
              :Dots="item.Dots"
            />
          </li>
        </ul>
      </div>
    </section>
    <section>
      <div class="container w-full justify-center items-center">
        <h2 class="text-white text-xl">Donnée extraites du 
          <a class="text-white/75" href="https://openpowerlifting.gitlab.io/opl-csv/bulk-csv.html">12/04/2024</a> depuis <a class="text-white/75" href="https://www.openipf.org/rankings/ipf">OpenIPF</a>
        </h2>
      </div>
    </section>
  </main>
</template>

<script setup>
const { data } = await useAsyncData("index-data", async () => {
  const item = await queryContent("/asbr").findOne();

  return item.body;
});

const filteredData = computed(() => {
  const out = [];

  for(let i = 0; i < data.value.length; i++) {
    const item = data.value[i];

    //Si l'athlete a été disqualifié on ne compte pas la comp
    if (item.Place === 'DQ') {
        continue;
    }

    if (!out[item.Name]) {
      out[item.Name] = item;
    } else {
      if (item.Date > out[item.Name].Date) {
        out[item.Name] = item;
      }
    }
  }

  return Object.values(out);
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
