<template>
  <p
    class="text-4xl text font-semibold uppercase px-3 py-2 bg-gradient-to-r hover:cursor-pointer border-2 rounded-lg"
    :class="{
      'classic': type === 'classic',
      'all': type === 'all',
      'women': type === 'women',
      'men': type === 'men',
      'opacity-45': !isActive
    }"
    @click="emit('change', !isActive)"
  >
    {{ text }}
  </p>
</template>

<script setup>
const props = defineProps({
  text: String,
  isActive: {
    type: Boolean,
    required: true
  },
  type: String
})

const emit = defineEmits(['change'])
</script>

<style lang="css"> 
.text::before {
  content: "";
  margin-bottom: 0.09em;
  display: table;
}

.text::after {
  content: "";
  margin-top: -0.09em;
  display: table;
}
</style>

<style lang="postcss" scoped>
  .classic {
     @apply from-custom-dark/30 to-gradient-white/30 border-gradient-white;
  }
  .all {
     @apply from-custom-dark/30 to-gradient-orange/30 border-gradient-orange;
  }
  .men {
     @apply from-custom-dark/30 to-gradient-blue/30 border-gradient-blue;
  }
  .women {
     @apply from-custom-dark/30 to-gradient-pink/30 border-gradient-pink;
  }
</style>
