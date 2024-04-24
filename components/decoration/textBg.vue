<template>
  <div
    class="absolute z-0 -top-[10rem] -left-[45rem] text-white overflow-hidden overflow-y-hidden uppercase max-h-full"
  >
    <p
      v-for="i in bgTextCount"
      unselectable="on"
      :key="i"
      class="w-full text-[32rem] leading-none font-black text-transparent opacity-[.07] my-8 whitespace-nowrap tracking-wide"
      :style="`margin-left : -${bgTextData[i]}rem`"
      style="
        text-stroke: 4px white;
        -webkit-text-stroke: 3px rgba(255,255,255, 0.38);
        user-select: none;
      "
    >
      {{ text }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  text: String,
  bgTextCount: {
    type: Number,
    default: 16
  }
})

const bgTextData = computed(() => {
  const pos = [];

  for (let i = 0; i < props.bgTextCount; i++) {
    pos.push(Math.floor(Math.random() * 77));
  }
  return pos;
});
</script>