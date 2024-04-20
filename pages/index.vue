<template>
  <div
    class="absolute z-0 -top-[10rem] -left-[45rem] text-white overflow-hidden overflow-y-hidden max-h-full"
  >
    <p
      v-for="i in bgTextCount"
      unselectable="on"
      :key="i"
      class="w-full text-[32rem] leading-none font-black text-transparent opacity-[.07] -mb-24 whitespace-nowrap tracking-wide"
      :style="`margin-left : -${bgTextData[i]}rem`"
      style="
        text-stroke: 4px white;
        -webkit-text-stroke: 3px rgba(255,255,255, 0.38);
        user-select: none;
      "
    >
      ABSR - RESULTS - ASBR
    </p>
  </div>

  <section class="w-full pt-32 pb-4">
    <div class="container">
      <input
        v-model="search"
        class="py-3 px-6 my-8 w-full text-white rounded-xl border-2 foxus:border-gradient-blue bg-transparent border-gradient-white bg-gradient-to-r from-gradient-dark/40 to-gradient-white/40 z-20 font-display text-xl"
        placeholder="Nom de l'athlète"
        style="backdrop-filter: blur(6px)"
      />
    </div>
  </section>

  <section class="w-full relative pt-4">
    <div class="container flex-col min-h-[80vh]">
      <transition-group
        class="w-full relative grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-4 lg:gap-8"
        name="list"
        tag="ul"
      >
        <li v-for="item in filteredList" :key="item.name">
          <resultsTotal
            :style="`--delay: ${i * 5}ms`"
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
      </transition-group>
    </div>
  </section>
</template>

<script setup>
const { data } = await useAsyncData("index-data", async () => {
  const item = await queryContent("/").findOne();

  return item.body;
});

const search = ref("");
const bgTextCount = ref(32);

const filteredList = computed(() => {
  const searchRegexp = new RegExp(search.value.toLowerCase());

  return data.value.filter((d) => {
    return searchRegexp.test(d.Name.toLowerCase());
  });
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

const bgTextData = computed(() => {
  const pos = [];
  for (let i = 0; i < bgTextCount.value; i++) {
    pos.push(Math.floor(Math.random() * 77));
  }
  return pos;
});
</script>

<style scoped>
.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-leave-from,
.list-enter-to {
  opacity: 1;
}

.list-enter-active,
.list-leave-active {
  transition: opacity 300ms;
  transition-delay: var(--delay);
}
</style>
