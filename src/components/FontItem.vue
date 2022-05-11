<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { defineProps, defineEmits, defineExpose, watch, toRefs } from 'vue'
const props = defineProps<{
  content: string,
  fontId: string;
  fontData: {name:string, types:string[], weight:number, letters:string[], tags:string[], desc:string|undefined};
  width: number;
  height: number;
  show:boolean;
  tagMap:{[key:string]:string}
}>()

const color = ref('black')
// let span:HTMLElement | null = null

const chars = new Set()
const reloadFont = (text:string) => {
  if (!props.show) { return }

  const newChars = Array.from(new Set(text)).filter(c => (!chars.has(c)))

  if (newChars.length === 0) { return }
  console.log(newChars)

  newChars.forEach(c => chars.add(c))
  const charsURI = encodeURIComponent(newChars.join(''))

  color.value = 'gray'
  const fontURL = `https://mojimiru.pythonanywhere.com?font=${props.fontId}&text=${charsURI}`.replace(/\(/g, '%28').replace(/\)/g, '%29')
  const fontFace = new FontFace(
    props.fontId,
    `url(${fontURL}) format('woff2')`
  )
  fontFace.load().then(loadedFace => {
    document.fonts.add(loadedFace)
    color.value = 'black'
  }).catch(e => {
    color.value = 'black'
    console.error(e)
  })
}

const { show } = toRefs(props)
watch(show, (value) => { value && reloadFont(props.content) })
defineExpose({ reloadFont })

const emit = defineEmits<{(e: 'focus', select:{name:string, types:string[], weight:number, letters:string[], tags:string[], desc:string|undefined}): string }>()
const focus = () => {
  emit('focus', props.fontData)
}
</script>

<template>
  <q-card class="column justify-end full-height" square @click="focus">
      <q-space/>
      <q-card-section align="center" class="q-pa-sm col-auto">
        <pre :id="fontId" :style="`white-space: pre-wrap; word-break:break-all; font-size: 30px; color:${color}; font-family: '${fontId}'`">{{ content }}</pre>
      </q-card-section>
      <q-space/>
      <q-card-section align="right" class="q-pa-none q-pr-md text-grey-8" style="bottom: 0">
        <q-space/>
        {{fontData.name}}
      </q-card-section>
  </q-card>
</template>

<style>
pre{
  font-family:serif;
  padding: 0;
  margin: 0;
}
</style>
