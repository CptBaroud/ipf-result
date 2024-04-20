<template>
  <NuxtLink
    class="z-10 flex flex-col xl:flex-row justify-between gap-16 font-thunder rounded-xl text-white p-2 xl:p-4 bg-gradient-to-b xl:bg-gradient-to-r border-2"
    :class="bg"
    style="backdrop-filter: blur(6px)"
  >
    <span class="font-black total">
      {{ TotalKg }}<span class="uppercase font-medium text-2xl">kg</span>
    </span>
    <ul
      class="w-full grid grid-cols-7 grid-rows-3 gap-x-4 items-center justify-between gap-y-3 text-6xl font-extrabold"
    >
      <li class="data">S</li>
      <li
        class="data col-span-2"
        :class="Squats[2].includes('-') ? 'opacity-[0.48]' : ''"
      >
        {{ Squats[2] }}
      </li>
      <li
        class="data col-span-2"
        :class="Squats[1].includes('-') ? 'opacity-[0.48]' : ''"
      >
        {{ Squats[1] }}
      </li>
      <li
        class="data col-span-2"
        :class="Squats[0].includes('-') ? 'opacity-[0.48]' : ''"
      >
        {{ Squats[0] }}
      </li>
      <li class="data">B</li>
      <li
        class="data col-span-2"
        :class="Benchs[2].includes('-') ? 'opacity-[0.48]' : ''"
      >
        {{ Benchs[2] }}
      </li>
      <li
        class="data col-span-2"
        :class="Benchs[1].includes('-') ? 'opacity-[0.48]' : ''"
      >
        {{ Benchs[1] }}
      </li>
      <li
        class="data col-span-2"
        :class="Benchs[0].includes('-') ? 'opacity-[0.48]' : ''"
      >
        {{ Benchs[0] }}
      </li>
      <li class="data">D</li>
      <li
        class="data col-span-2"
        :class="Deadlifts[2].includes('-') ? 'opacity-[0.48]' : ''"
      >
        {{ Deadlifts[2] }}
      </li>
      <li
        class="data col-span-2"
        :class="Deadlifts[1].includes('-') ? 'opacity-[0.48]' : ''"
      >
        {{ Deadlifts[1] }}
      </li>
      <li
        class="data col-span-2"
        :class="Deadlifts[0].includes('-') ? 'opacity-[0.48]' : ''"
      >
        {{ Deadlifts[0] }}
      </li>
    </ul>
    <!-- <ul
      class="w-full grid grid-cols-7 grid-rows-3 gap-x-4 items-center justify-between gap-y-3 text-6xl font-extrabold"
    >
      <li class="data">S</li>
      <li
        class="data col-span-2"
        :class="!isBest(Squats[2], Squats) ?? 'opacity-[0.48]'"
      >
        {{ Squats[2] }}
      </li>
      <li
        class="data col-span-2"
        :class="!isBest(Squats[2], Squats) ?? 'opacity-[0.48]'"
      >
        {{ Squats[1] }}
      </li>
      <li
        class="data col-span-2"
        :class="!isBest(Squats[2], Squats) ?? 'opacity-[0.48]'"
      >
        {{ Squats[0] }}
      </li>
      <li class="data">B</li>
      <li
        class="data col-span-2"
        :class="!isBest(Squats[2], Squats) ?? 'opacity-[0.48]'"
      >
        {{ Benchs[2] }}
      </li>
      <li
        class="data col-span-2"
        :class="!isBest(Squats[2], Squats) ?? 'opacity-[0.48]'"
      >
        {{ Benchs[1] }}
      </li>
      <li
        class="data col-span-2"
        :class="!isBest(Squats[2], Squats) ?? 'opacity-[0.48]'"
      >
        {{ Benchs[0] }}
      </li>
      <li class="data">D</li>
      <li
        class="data col-span-2"
        :class="!isBest(Squats[2], Squats) ?? 'opacity-[0.48]'"
      >
        {{ Deadlifts[2] }}
      </li>
      <li
        class="data col-span-2"
        :class="!isBest(Squats[2], Squats) ?? 'opacity-[0.48]'"
      >
        {{ Deadlifts[1] }}
      </li>
      <li
        class="data col-span-2"
        :class="!isBest(Squats[2], Squats) ?? 'opacity-[0.48]'"
      >
        {{ Deadlifts[0] }}
      </li>
    </ul> -->
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  MeetName: String,
  TotalKg: String,
  Squats: [String],
  Benchs: [String],
  Deadlifts: [String],
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

const isBest = (value, array) => {

  if (value.includes('-')) {
    return false
  }

  if (value > array[1]) {
    return true
  }

  return false
}
</script>

<style lang="css">
.total {
  position: relative;
  font-size: 260px;
  line-height: 182px;
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
</style>
