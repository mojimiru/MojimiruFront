<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { defineProps, defineExpose } from 'vue'
const props = defineProps<{
  content: string,
  fontId: string;
}>()

const color = ref('black')

const reflesh = (charsURI: string) => {
  color.value = 'gray'
  const fontURL = `https://mojimiru.pythonanywhere.com?font=${props.fontId}&text=${charsURI}`
  const fontFace = new FontFace(
    props.fontId,
    `url(${fontURL})`
  )
  fontFace.load().then(loadedFace => {
    console.log(loadedFace.family)
    document.fonts.add(loadedFace)
    color.value = 'black'
  }).catch(e => {
    color.value = 'black'
    console.error(e)
  })
}

defineExpose({ reflesh })
</script>

<template>
  <p :id="fontId" :style="`font-size: 50px; color:${color}; font-family: ${fontId}`">{{ content }}</p>
</template>
