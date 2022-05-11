<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
    bgColor:string,
    bgColorSelected:string,
    color:string,
    colorSelected:string,
    modelValue: boolean;
  }>()

const emit = defineEmits<{(e: 'update:modelValue', select: boolean): string}>()

const selected = computed({
  get: () => props.modelValue,
  set: (value) => { // 値に変更があると呼ばれるsetter
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div :class="`chip bg-${selected?bgColorSelected:bgColor} text-${selected?colorSelected:color}`" @click="selected=!selected"><slot></slot></div>
</template>

<style scoped>
.chip {
  font-weight: 500;
  display: inline-block;
  cursor: pointer;
  user-select: none;
  padding: 0.1em 0.5em 0.1em 0.5em;
  border-radius: 1em;
  width: fit-content;
}
</style>
