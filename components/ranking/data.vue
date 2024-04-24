<template>
  <div>
    <h3 class="text-6xl font-semibold pb-12 uppercase">{{  title }}</h3>
    <ul v-if="data.length !== 0">
      <li class="flex flex-row justify-between text-4xl font-regular" v-for="(item, i) in display" :key="i">
        {{ item.name }} <span class="font-bold">{{ item[k] }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="js" setup>
const props = defineProps({
  data: { type: Array, required: true },
  title: { type: String, required: true },
  k: { type: String, required: true}
})

const display = computed(() => {
  if (!props.data) return [];

  return props.data.sort((a, b) => {
    return b[props.k] - a[props.k]
  }).slice(0 ,5)
})
</script>