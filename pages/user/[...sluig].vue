<template>
  <section class="text-white w-full">
    <div class="container w-full flex-col items-start py-16" v-if="data">
      <h1 class="text-9xl font-black">{{ data.title }}</h1>
      <div class="flex flex-col gap-8 py-8">
        <div v-for="item in sortedComps" :key="item.MeetName">
          <h2 class="text-4xl font-bold">{{ item.MeetName }} - <span class="font-medium"> {{ item.Date }}</span></h2> 
          <ResultsCard
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
        </div>
      </div>
    </div>
    <div v-else class="py-32 w-full flex flex-col items-center gap-8">
      <h1 class="text-3xl font-medium">Un problème est survenu</h1>
      <nuxt-link class="py-2 px-3 text-xl font-bold text-white bg-gradient-blue/70 rounded-lg" to="/">
        Retour
      </nuxt-link>
    </div>
  </section>
</template>

<script setup>
const route = useRoute();

const { data } = await useAsyncData(`userdata-${route.path}`, async () => {
  const item = await queryContent(route.path).findOne();

  return item;
});

const sortedComps = computed(() => {

  return data.value.comps.sort((a, b) => {
    return new Date(b.Date) - new Date(a.Date);
  })
})
</script>
