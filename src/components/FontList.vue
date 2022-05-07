<script setup lang="ts">
import { ref, reactive } from '@vue/reactivity'
import FontItem from '@/components/FontItem.vue'
import { onBeforeUpdate, onMounted } from 'vue'
const activeContent = ref('ためしがき')
const content = ref('')

const fonts = reactive(
  {
    kaisotai_next: '廻想体 ネクスト ユーピー（B）',
    marukoias_alpha: 'まるこいあすα',
    hangyaku: '叛逆明朝',
    soukou_mincho: '装甲明朝'
  })
const fontRefs = ref([])

onBeforeUpdate(() => {
  fontRefs.value = []
})

let letters = new Set()
const reflesh = () => {
  content.value = activeContent.value
  const newLetters = new Set(content.value)
  const unloadedLetters = Array.from(newLetters).filter(c => (!letters.has(c)))

  if (unloadedLetters.length === 0) { return }
  console.log(unloadedLetters)

  letters = new Set([...Array.from(letters), ...Array.from(unloadedLetters)])
  fontRefs.value.forEach(el => {
    el.reflesh(encodeURIComponent(unloadedLetters.join('')))
  })
}

onMounted(() => reflesh())
</script>

<template>
  <v-container fluid>
    <textarea type="text" id="text" required size="10" v-model="activeContent" @change="reflesh"/>
    <v-row dense>
      <v-col
        v-for="(fontName, fontId, j) in fonts"
        :key="fontId"
        cols="12"
        lg="3"
        md="4"
        sm="6"
        xs="12"
      >
        <FontItem :ref="el => {if (el) fontRefs[j] = el}" :width="300" :height="100" :content="content" :fontId="fontId" :fontName="fontName"></FontItem>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
@font-face {
font-family: 'ok';
  src: url('https://github.com/adobe-fonts/adobe-notdef/raw/master/AND-Regular.ttf') format('truetype');
}
</style>
