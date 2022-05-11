<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { defineProps, defineEmits, watch } from 'vue'
import ToggleChip from './ToggleChip.vue'

const props = defineProps<{
  modelValue: string[];
  options: { value: string, label: string }[]
}>()

const emit = defineEmits<{(e: 'update:modelValue', select: string[]): string }>()

const select = ref(props.options.map(opt => props.modelValue.includes(opt.value)))

watch(() => [...select.value], (currentValue, oldValue) => {
  console.log(
    'Watch props.selected function called with args:',
    currentValue,
    oldValue
  )
  emit('update:modelValue', props.options.filter((_, i) => currentValue[i]).map(opt => opt.value))
})
</script>

<template>
  <toggle-chip class="chip" color="black" color-selected="white" bg-color="grey-3" bg-color-selected="grey-10" v-model="select[i]"
    v-for="(option, i) in options" :key="option.value">{{ option.label }}</toggle-chip>
</template>

<style scoped>
.chip {
  margin-left: 0.3em;
  margin-bottom: 0.5em;
}
</style>
