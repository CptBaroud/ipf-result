<template>
  <div
    class="z-10 flex flex-col md:flex-row justify-between gap-8 md:gap-16 font-thunder rounded-xl text-custom-dark dark:text-white p-2 pt-3 xl:p-4 bg-gradient-to-b xl:bg-gradient-to-r border-2"
    :class="bg"
    style="backdrop-filter: blur(6px)"
  >
    <p class="font-black text-[12rem] md:text-[16rem]">
      {{ TotalKg ?? 0 }}<span class="uppercase font-medium text-2xl">kg</span>
    </p>
    <ul
      class="w-full grid grid-cols-7 grid-rows-3 gap-x-4 items-center justify-between gap-y-3 font-extrabold"
    >
      <li class="text-4xl xs:text-5xl sm:text-6xl">
        <p>S</p>
      </li>
      <li
        v-for="item in filteredSquats"
        :key="item"
        class="text-4xl xs:text-5xl sm:text-6xl col-span-2"
        :class="item.isBest ? '' : 'opacity-[0.48]'"
      >
        <p>{{ item.value }}</p>
      </li>
      <li class="text-4xl xs:text-5xl sm:text-6xl">
        <p>B</p>
      </li>
      <li
        v-for="item in filteredBench"
        :key="item"
        class="text-4xl xs:text-5xl sm:text-6xl col-span-2"
        :class="item.isBest ? '' : 'opacity-[0.48]'"
      >
        <p>{{ item.value }}</p>
      </li>
      <li class="text-4xl xs:text-5xl sm:text-6xl">
        <p>D</p>
      </li>
      <li
        v-for="item in filteredDeadlifts"
        :key="item"
        class="text-4xl xs:text-5xl sm:text-6xl col-span-2"
        :class="item.isBest ? '' : 'opacity-[0.48]'"
      >
        <p>{{ item.value }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  MeetName: String,
  TotalKg: String,
  Squats: Array,
  Benchs: Array,
  Deadlifts: Array,
});

// Moche mais ça marche
const bgGradients = {
  0: "from-gradient-white/[.48] to-gradient-dark/[.48] dark:from-gradient-dark/[.48] dark:to-gradient-white/[.48] dark:border-gradient-white border-gradient-dark",
  1: "from-gradient-white/[.48] to-gradient-blue/[.48] dark:from-gradient-dark/[.48] dark:to-gradient-blue/[.48] border-gradient-blue",
  2: "from-gradient-white/[.48] to-gradient-pink/[.48] dark:from-gradient-dark/[.48] dark:to-gradient-pink/[.48] border-gradient-pink",
  3: "from-gradient-white/[.48] to-gradient-orange/[.48] dark:from-gradient-dark/[.48] dark:to-gradient-orange/[.48] border-gradient-orange",
  france:
    "from-gradient-france-end/[.48] to-gradient-france-start/[.48] border-gradient-france-start dark:from-gradient-france-start/[.48]  dark:to-gradient-france-end/[.48] border-gradient-france-end",
};


const bg = computed(() => {
  if (props.MeetName?.includes("Championnats de France")) {
    return bgGradients.france;
  }

  const random = Math.floor(Math.random() * 4);
  return bgGradients[random];
});

const findHBest = (arr) => {
  const max = arr.reduce((a, b) => Math.max(a, b));
  return arr
    .map((value) => ({ value, isBest: Number.parseFloat(value) === max }))
    .reverse();
};

const filteredSquats = computed(() => {
  return findHBest(props.Squats);
});
const filteredDeadlifts = computed(() => {
  return findHBest(props.Deadlifts);
});
const filteredBench = computed(() => {
  return findHBest(props.Benchs);
});
</script>
