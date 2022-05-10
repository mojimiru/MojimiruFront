<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { defineProps, defineEmits, watch } from 'vue'

const props = defineProps<{
    modelValue: string[];
    options:{value:string, label:string}[]
  }>()

const emit = defineEmits<{(e: 'update:modelValue', select: string[]): string}>()

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
  <q-chip v-model:selected="select[i]" v-for="(option, i) in options" :key="option.value">{{option.label}}</q-chip>
</template>
