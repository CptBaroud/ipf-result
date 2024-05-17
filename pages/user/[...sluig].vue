<template>
  <DecorationTextBg v-if="data" :text="`${data.title} - ${data.title}`" />

  <section class="text-custom-dark dark:text-white w-full pt-16">
    <div class="container gap-y-16 flex-col items-start" v-if="data">
      <div class="w-max-content">
        <h1 class="text-6xl md:text-9xl uppercase font-black">{{ data.title }}</h1>
        <div class="w-full inline-flex justify-between items-end text-3xl md:text-6xl pt-2">
          <h2 class="font-light">-{{ data.weightClas }}kg</h2>
          <h2 class="font-bold uppercase"> {{ data.division }}</h2>
        </div>
      </div>
      <div class="container w-full items-start">
        <div class="flex flex-col  gap-8 py-8">
          <div v-for="item in data.comps" :key="item.MeetName">
            <h2 class="text-4xl font-bold pb-8" style="line-height: 105% !important">
              {{ item.MeetName }} -
              <span class="font-medium"> {{ item.Date }}</span>
            </h2>
            <ResultsComp :MeetName="item.MeetName" :TotalKg="item.TotalKg"
              :Squats="[item.Squat1Kg, item.Squat2Kg, item.Squat3Kg]"
              :Benchs="[item.Bench1Kg, item.Bench2Kg, item.Bench3Kg]"
              :Deadlifts="[item.Deadlift1Kg, item.Deadlift2Kg, item.Deadlift3Kg]" />
          </div>
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
  console.log(item)
  return item;
});
</script>
