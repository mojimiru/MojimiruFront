<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { defineProps, defineExpose, watch, toRefs } from 'vue'
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
const fontsize = ref(30)
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
  console.log('fontsize.value')
  const fontURL = `https://mojimiru.pythonanywhere.com?font=${props.fontId}&text=${charsURI}`
  const fontFace = new FontFace(
    props.fontId,
    `url(${fontURL})`
  )
  fontFace.load().then(loadedFace => {
    document.fonts.add(loadedFace)
    document.fonts.values()
    console.log(fontsize.value)
    color.value = 'black'
  }).catch(e => {
    color.value = 'black'
    console.error(e)
  })
}

const { show } = toRefs(props)
watch(show, (value) => { value && reloadFont(props.content) })
defineExpose({ reloadFont })
</script>

<template>
  <v-card class="d-flex flex-column align-center" height="100%">
    <v-card-title class="pt-0 pb-0 mb-0">
      <!-- <v-spacer/> -->
      <p>
        <pre :id="fontId" class="pt-4" :style="`line-height:1; white-space: pre-wrap; font-size: ${fontsize}px; color:${color}; font-family: '${fontId}'`">{{ content }}</pre>
      </p>
      <!-- <v-spacer/> -->
    </v-card-title>
    <v-spacer/>
    <v-card-text class="text-caption align-self-end d-flex flex-column pt-1 pb-0" style="bottom: 0">
      <v-spacer/>
      {{fontData.name}}
    </v-card-text>
    <v-card-text class="text-caption align-self-end d-flex flex-column" style="bottom: 0">
      <v-row>
        <v-chip v-for="a in fontData.tags" :key="a">
          {{tagMap[a]}}
        </v-chip>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style>
pre{
  font-family:serif;
}
</style>
