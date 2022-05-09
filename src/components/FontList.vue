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
const selectedTags = ref(tagGroups.map(() => []))
const includes = (index:number) => selectedTags.value.every((tags, i) => !tags.length || tags.some(tag => fonts[index].tags.includes(tagGroups[i][tag])))
</script>

<template>
  <v-container fluid>
    <v-textarea
    label="試したい単語/文章を入力"
    v-model="activeContent"
    @change="reflesh"
    dense
    auto-grow
    rows="1"
    />
    <div v-for="(group, i) in tagGroups" :key="i">
      <v-chip-group column multiple active-class="primary--text" v-model="selectedTags[i]">
        <v-chip
          v-for="tag of group"
          :key="tag"
        >
          {{ fontJson.tags[i][tag] }}
        </v-chip>
      </v-chip-group>
    </div>
    <v-row dense>
      <template v-for="(font, i) in fonts" :key="i">
        <v-col
          v-show="includeMap[i]"
          cols="12"
          lg="3"
          md="4"
          sm="6"
          xs="12"
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
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<style>
@font-face {
font-family: 'ok';
  src: url('https://github.com/adobe-fonts/adobe-notdef/raw/master/AND-Regular.ttf') format('truetype');
}
</style>
