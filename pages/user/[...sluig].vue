<template>
  <section class="text-white w-full">
    <div class="container w-full flex-col items-start py-16">
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
