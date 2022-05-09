<script setup lang="ts">
import { computed, ref } from '@vue/reactivity'
import * as fontJson from '@/assets/fonts.json'

const fonts = fontJson.fonts

const tagGroups = fontJson.tags.map(tags => Object.keys(tags))
const selectedTags = ref(tagGroups.map(() => []))
const includeMap = computed(() => [...fonts.keys()].map(i => includes(i)))
const includes = (index:number) => selectedTags.value.every((tags, i) => !tags.length || tags.some(tag => fonts[index].tags.includes(tagGroups[i][tag])))
</script>

<template>
  <v-container fluid>
    <div v-for="(group, i) in tagGroups" :key="i">
      <v-chip-group column multiple active-class="primary--text" v-model="selectedTags[i]">
        <v-chip
          v-for="tag of group"
          :key="tag"
        >
          {{ tag }}
        </v-chip>
      </v-chip-group>
    </div>
    <v-row dense>
      <template v-for="(font, i) in fonts" :key="i">
        <v-col
          v-show="includes(i)"
          cols="12"
          lg="3"
          md="4"
          sm="6"
          xs="12"
        >
          <div>
            {{font.id}}
          </div>
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
