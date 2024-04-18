<template>
  <div
    class="z-10 flex flex-col lg:flex-row gap-4 lg:gap-32 justify-between font-thunder rounded-xl text-white p-2 lg:p-4 bg-gradient-to-b lg:bg-gradient-to-r border-2"
    :class="bg"
    style="backdrop-filter: blur(6px)"
  >
    <div class="flex flex-col justify-between">
      <span class="text-4xl lg:text-5xl font-bold">
        {{ name.prenom }} <span class="uppercase">{{ name.nom }}</span>
      </span>
      <span class="text-8xl lg:text-9xl leading-none -mb-4 lg:-mb-6 font-black">
        {{ TotalKg }}<span class="uppercase font-medium text-2xl">kg</span>
      </span>
      <span
        class="text-3xl lg:text-4xl text-white/72 font-bold lg:font-extrabold"
      >
        <span>-{{ WeightClassKg }}KG</span>
        <span class="uppercase font-medium text-white text-xs lg:text-lg">{{
          Division
        }}</span>
      </span>
    </div>
    <ul class="flex flex-row lg:flex-col justify-between items-end -mb-2">
      <li class="text-md lg:text-base uppercase font-thin">
        squat <br class="lg:hidden" />
        <span class="text-6xl font-semibold lg:font-bold">{{
          BestSquatKg
        }}</span>
      </li>
      <li class="text-md lg:text-base uppercase font-thin">
        bench <br class="lg:hidden" /><span
          class="text-6xl font-semibold lg:font-bold"
          >{{ BestBenchKg }}</span
        >
      </li>
      <li class="text-md lg:text-base uppercase font-thin">
        terre <br class="lg:hidden" /><span
          class="text-6xl font-semibold lg:font-bold"
          >{{ BestDeadliftKg }}</span
        >
      </li>
    </ul>
  </div>
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

const name = computed(() => {
  const split = props.Name.split(" ");

  return {
    prenom: split[0],
    nom: split[1],
  };
});
</script>
