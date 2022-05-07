<script setup lang="ts">
import { ref, reactive } from '@vue/reactivity'
import FontItem from '@/components/FontItem.vue'
import { onBeforeUpdate, onMounted } from 'vue'
const activeContent = ref('ためしがき')
const content = ref('')

const fonts = reactive(['kaisotai_next', 'marukoias_alpha', 'hangyaku'])
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
  <div class="fontlist">
    <input type="text" id="text" required size="10" v-model="activeContent" @change="reflesh">
    <FontItem :ref="el => {if (el) fontRefs[i] = el}" v-for="(font, i) in fonts" :key="font" :content="content" :fontId="font"></FontItem>
  </div>
</template>
