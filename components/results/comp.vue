<template>
  <NuxtLink
    class="z-10 flex flex-col xl:flex-row justify-between gap-8 md:gap-16 font-thunder rounded-xl text-white p-2 pt-3 xl:p-4 bg-gradient-to-b xl:bg-gradient-to-r border-2"
    :class="bg"
    style="backdrop-filter: blur(6px)"
  >
    <span class="font-black total">
      {{ TotalKg }}<span class="uppercase font-medium text-2xl">kg</span>
    </span>
    <ul
      class="w-full grid grid-cols-7 grid-rows-3 md:gap-x-4 items-center justify-between gap-y-3 font-extrabold"
    >
      <li class="data">S</li>
      <li
        v-for="item in filteredSquats"
        :key="item"
        class="data col-span-2"
        :class="item.isBest ? '' : 'opacity-[0.48]'"
      >
        {{ item.value }}
      </li>
      <li class="data">B</li>
      <li
        v-for="item in filteredBench"
        :key="item"
        class="data col-span-2"
        :class="item.isBest ? '' : 'opacity-[0.48]'"
      >
        {{ item.value }}
      </li>
      <li class="data">D</li>
      <li
        v-for="item in filteredDeadlifts"
        :key="item"
        class="data col-span-2"
        :class="item.isBest ? '' : 'opacity-[0.48]'"
      >
        {{ item.value }}
      </li>
    </ul>
  </NuxtLink>
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

const findHBest = (arr) => {
  const max = arr.reduce((a, b) => Math.max(a, b));
  return arr
    .map((value) => ({ value, isBest: parseFloat(value) === max }))
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

<style lang="css">
.total {
  position: relative;
  font-size: 260px;
  line-height: 182px;

  @media (max-width: 1024px) {
    font-size: 160px;
    line-height: 112px;
  }
}

.total::before {
  content: "";
  margin-bottom: 0.09em;
  display: table;
}

.total::after {
  content: "";
  margin-top: -0.09em;
  display: table;
}

.data {
  font-size: 64.2857px;
  line-height: 45px;

  @media screen and (max-width: 1024px) {
    font-size: 50px;
    line-height: 35px;
  }
}

.data::before {
  content: "";
  margin-bottom: 0.09em;
  display: table;
}

.data::after {
  content: "";
  margin-top: -0.09em;
  display: table;
}

.capsizedText {
  font-size: 50px;
  line-height: 35px;
}
</style>
