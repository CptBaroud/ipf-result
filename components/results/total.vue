<template>
  <NuxtLink
    class="z-10 flex flex-col xl:flex-row justify-between font-thunder rounded-xl text-white p-2 xl:p-4 bg-gradient-to-b xl:bg-gradient-to-r border-2"
    :class="bg"
    style="backdrop-filter: blur(6px)"
    :to="`/user/${Name.replace(' ', '-').toLocaleLowerCase()}`"
  >
    <div class="flex flex-col gap-y-3 justify-between">
      <span class="text-4xl xl:text-5xl font-bold uppercase ">
        {{  Name }}
      </span>
      <span class="capsizedText font-black">
        {{ TotalKg }}<span class="uppercase font-medium text-2xl">kg</span>
      </span>
      <span
        class="text-3xl xl:text-4xl text-white/72 font-bold xl:font-extrabold -mb-2"
      >
        <span>-{{ WeightClassKg }}KG</span>
        <span class="uppercase font-medium text-white text-xs xl:text-xl">{{
          Division
        }}</span>
      </span>
    </div>
    <ul class="flex flex-row xl:flex-col justify-between items-end -mb-2">
      <li class="text-md xl:text-base uppercase font-thin">
        squat <br class="xl:hidden" />
        <span class="text-6xl font-semibold xl:font-bold">{{
          BestSquatKg
        }}</span>
      </li>
      <li class="text-md xl:text-base uppercase font-thin">
        bench <br class="xl:hidden" /><span
          class="text-6xl font-semibold xl:font-bold"
          >{{ BestBenchKg }}</span
        >
      </li>
      <li class="text-md xl:text-base uppercase font-thin -mb-2">
        terre <br class="xl:hidden" /><span
          class="text-6xl font-semibold xl:font-bold"
          >{{ BestDeadliftKg }}</span
        >
      </li>
    </ul>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  Name: String,
  Division: String,
  WeightClassKg: String,
  BestSquatKg: String,
  BestBenchKg: String,
  BestDeadliftKg: String,
  TotalKg: String,
  Dots: String,
  MeetName: String,
});

// Moche mais ça marche
const bgGradients = {
  0: "from-gradient-dark/[.48] to-gradient-white/[.48] border-gradient-white",
  1: "from-gradient-dark/[.48] to-gradient-blue/[.48] border-gradient-blue",
  2: "from-gradient-dark/[.48] to-gradient-pink/[.48] border-gradient-pink",
  3: "from-gradient-dark/[.48] to-gradient-orange/[.48] border-gradient-orange",
  france:
    "from-gradient-france-start/[.48] to-gradient-france-end/[.48] border-gradient-france-end",
};

const bg = computed(() => {
  if (props.MeetName && props.MeetName.includes("Championnats de France")) {
    return bgGradients["france"];
  }

  const random = Math.floor(Math.random() * 4);
  return bgGradients[random];
});

</script>


<style scoped>
.capsizedText {
  font-size: 120px;
  line-height: 84px;
}

.capsizedText::before {
  content: "";
  margin-bottom: 0.09em;
  display: table;
}

.capsizedText::after {
  content: "";
  margin-top: -0.09em;
  display: table;
}
</style>