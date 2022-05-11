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
  <div :class="`chip chip-${$q.dark.mode?'black':'white'}-${selected?'selected':'unselected'}`" @click="selected=!selected"><slot></slot></div>
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
.chip-black-unselected{
  color: white;
  background-color: black;
  border-color: white;
  border-width: 1px;
  border-style: solid;
}
.chip-black-selected{
  color: black;
  background-color: white;
  border-color: black;
  border-width: 1px;
  border-style: solid;
}

.chip-white-unselected{
  color: black;
  background-color: #e8e8e8;
}

.chip-white-selected{
  color: white;
  background-color: black;
}
</style>
