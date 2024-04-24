<template>
  <div class="flex flex-row flex-wrap gap-2">
    <UiTag
      v-for="tag in tags"
      :key="tag.text"
      :text="tag.text"
      :isActive="active === tag.value"
      :type="tag.type"
      @change="
        () => {
          emit('update', tag.value);
        }
      "
    />
  </div>
</template>

<script setup>
const props = defineProps({
  tags: {
    type: Array,
    required: true,
  },
  active: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update"]);
</script>
