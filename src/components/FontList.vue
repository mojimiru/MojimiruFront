<script setup lang="ts">
import { ref, reactive, computed } from '@vue/reactivity'
import FontItem from '@/components/FontItem.vue'
import { onBeforeUpdate, onMounted } from 'vue'
import * as fontJson from '@/assets/fonts.json'
const activeContent = ref('ためしがき')
const content = ref('')

console.log(fontJson)

const fonts = fontJson.fonts
const fontRefs = ref([])

onBeforeUpdate(() => {
  fontRefs.value = []
})

const reflesh = () => {
  content.value = activeContent.value
  fontRefs.value.forEach(el => {
    el.reloadFont(content.value)
  })
}
onMounted(() => reflesh())

const tagMap = Object.fromEntries(fontJson.tags.flatMap(Object.entries))

const includeMap = computed(() => [...fonts.keys()].map(includes))
const tagGroups = fontJson.tags.map(tags => Object.keys(tags))
const selectedTags = ref(tagGroups.map(l => (Object.fromEntries(l.map(v => [v, false])))))
const includes = (index:number) => selectedTags.value.every(tags => !Object.values(tags).some(Boolean) || fonts[index].tags.some(tag => tags[tag]))
</script>

<template>
  <div class="q-pa-md q-col-gutter-md" @click="()=>{}">
    <div>
      <q-input
        v-model="activeContent"
        filled
        autogrow
        @change="reflesh"
      />
    </div>
    <div v-for="(group, i) in tagGroups" :key="i">
      <div>
        <q-chip
          v-for="tag of group"
          :key="tag"
          v-model:selected="selectedTags[i][tag]"
        >
          {{ fontJson.tags[i][tag] }}
        </q-chip>
      </div>
    </div>
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
          />
        </div>
      </template>
    </div>
  </div>
</template>

<style>
@font-face {
font-family: 'ok';
  src: url('https://github.com/adobe-fonts/adobe-notdef/raw/master/AND-Regular.ttf') format('truetype');
}
</style>
