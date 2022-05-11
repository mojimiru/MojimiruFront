<script setup lang="ts">
import { ref, computed } from '@vue/reactivity'
import FontItem from '@/components/FontItem.vue'
import { defineProps, defineExpose, onBeforeUpdate, onMounted } from 'vue'
import * as fontJson from '@/assets/fonts.json'
import FontDialog from './FontDialog.vue'

const props = defineProps<{
  text:string
  selected:string[][]
  tagMap:{[k: string]: string}
}>()

const content = ref('')

console.log(fontJson)

const fonts = fontJson.fonts
const fontRefs = ref([])

onBeforeUpdate(() => {
  fontRefs.value = []
})

const reflesh = () => {
  content.value = props.text
  fontRefs.value.forEach(el => {
    el.reloadFont(content.value)
  })
}
onMounted(() => reflesh())
defineExpose({ reflesh })

const includeMap = computed(() => [...fonts.keys()].map(includes))
const includes = (index:number) => props.selected.every(tags => !tags.length || tags.some(tag => fonts[index].tags.includes(tag)))

const focused = ref(false)
const focusFont = ref(null)
const focus = (font) => {
  focusFont.value = font
  focused.value = true
}
</script>

<template>
  <div class="q-pa-md q-col-gutter-md" @click="()=>{}">
    <div class="q-col-gutter-md row items-stretch">
      <template v-for="(font, i) in fonts" :key="i">
        <div class="col-12 col-lg-3 col-md-4 col-sm-6 col-xs-12"
          v-show="includeMap[i]"
        >
          <FontItem
          :ref="el => {if (el) fontRefs[i] = el}"
          :show="includeMap[i]"
          :width="300"
          :height="100"
          :content="content"
          :fontId="font.id"
          :fontData="font"
          :tagMap="tagMap"
          @focus="focus"
          />
        </div>
      </template>
    </div>
    <q-dialog v-model="focused">
      <FontDialog :fontData="focusFont" :content="text" :fontsize="30" :tagMap="tagMap" />
    </q-dialog>
  </div>
</template>

<style>
@font-face {
font-family: 'ok';
  src: url('https://github.com/adobe-fonts/adobe-notdef/raw/master/AND-Regular.ttf') format('truetype');
}
</style>
